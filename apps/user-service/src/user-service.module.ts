import { Module, OnModuleInit } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { Kafka } from 'kafkajs';
import { createTopics } from '@libs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/user-service/.env', 'apps/user-service/.env.local'],
    }),
  ],
  controllers: [UserServiceController],
})
export class UserServiceModule implements OnModuleInit {
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'user-service-admin',
      brokers: ['localhost:9092'],
    });

    await createTopics(kafka, ['user.list']);
  }
}
