import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createTypeOrmOptions } from '@libs/common';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/auth-service/.env.local', 'apps/auth-service/.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return createTypeOrmOptions(configService, 'auth-service');
      },
    }),
    AuthModule,
  ],
})
export class AuthServiceModule {}
