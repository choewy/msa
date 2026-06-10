import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Kafka } from 'kafkajs';

import { createTopics, createTypeOrmOptions, UserTopic } from '@libs/common';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/user-service/.env', 'apps/user-service/.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return createTypeOrmOptions(configService, 'user-service');
      },
    }),
    UserModule,
  ],
})
export class UserServiceModule implements OnModuleInit {
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'user-service-admin',
      brokers: ['localhost:9092'],
    });

    await createTopics(kafka, Object.values(UserTopic));
  }
}
