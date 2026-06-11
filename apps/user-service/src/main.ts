import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { createTcpMicroServiceOptions } from '@libs/common';

import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserServiceModule, createTcpMicroServiceOptions());
  await app.listen();
}

void bootstrap();
