import { Module, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { createTopics, UserTopic } from '@libs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/user-service/.env', 'apps/user-service/.env.local'],
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
