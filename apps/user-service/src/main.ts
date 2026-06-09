import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { createKafkaMicroServiceOptions } from '@libs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    createKafkaMicroServiceOptions('user-service', 'user-service-consumer'),
  );

  await app.listen();
}

void bootstrap();
