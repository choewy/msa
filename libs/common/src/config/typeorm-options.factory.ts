import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { resolve } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DIST_APP_ROOT } from '../constants';

export function createTypeOrmOptions(configService: ConfigService, serviceName: string): TypeOrmModuleOptions {
  const isLocal = configService.get<string>('NODE_ENV') === 'local';

  return {
    type: 'postgres',
    host: configService.getOrThrow<string>('DB_HOST'),
    port: +configService.getOrThrow<string>('DB_PORT'),
    username: configService.getOrThrow<string>('DB_USERNAME'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    database: configService.getOrThrow<string>('DB_DATABASE'),
    namingStrategy: new SnakeNamingStrategy(),
    logging: isLocal ? true : ['error', 'warn'],
    autoLoadEntities: true,
    migrations: [resolve(DIST_APP_ROOT, `apps/${serviceName}**/*-migration.{js,ts}`)],
  };
}
