import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { createKafkaMicroServiceOptions } from '@libs/common';

import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthServiceModule, createKafkaMicroServiceOptions('auth-service', 'auth-service-consumer'));

  await app.listen();
}

void bootstrap();
