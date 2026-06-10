import { VersioningType } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';
import { cleanupOpenApiDoc } from 'nestjs-zod';

import { ApiGatewayModule } from './api-gateway.module';
import { apiGatewayConfig } from './config/api-gateway.config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  const isLocal = configService.get('NODE_ENV') === 'local';

  const { port, hostname, cors } = configService.getOrThrow<ConfigType<typeof apiGatewayConfig>>('API_GATEWAY_CONFIG');

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });
  app.enableCors(cors);
  app.enableShutdownHooks();

  if (isLocal) {
    const swaggerConfig = new DocumentBuilder().build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, cleanupOpenApiDoc(swaggerDocument));
  }

  await app.listen(port, hostname);
}

void bootstrap();
