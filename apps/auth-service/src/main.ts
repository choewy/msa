import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { createTcpMicroServiceOptions } from '@libs/common';

import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthServiceModule, createTcpMicroServiceOptions());
  await app.listen();
}

void bootstrap();
