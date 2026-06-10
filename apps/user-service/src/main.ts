import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { createKafkaMicroServiceOptions } from '@libs/common';

import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserServiceModule, createKafkaMicroServiceOptions('user-service', 'user-service-consumer'));
  await app.listen();
}

void bootstrap();
