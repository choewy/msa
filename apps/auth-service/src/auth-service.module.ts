import { createTopics } from '@libs/common';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Kafka } from 'kafkajs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/auth-service/.env', 'apps/auth-service/.env.local'],
    }),
  ],
})
export class AuthServiceModule implements OnModuleInit {
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'auth-service-admin',
      brokers: ['localhost:9092'],
    });

    await createTopics(kafka, ['login', 'register']);
  }
}
