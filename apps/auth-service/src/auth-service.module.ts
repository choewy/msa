import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Kafka } from 'kafkajs';

import { AuthTopic, createTopics, createTypeOrmOptions } from '@libs/common';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/auth-service/.env.local', 'apps/auth-service/.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return createTypeOrmOptions(configService, 'auth-service');
      },
    }),
    AuthModule,
  ],
})
export class AuthServiceModule implements OnModuleInit {
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'auth-service-admin',
      brokers: ['localhost:9092'],
    });

    await createTopics(kafka, Object.values(AuthTopic));
  }
}
