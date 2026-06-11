import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { createTcpClientOptions } from '@libs/common';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_CLIENT',
        inject: [ConfigService],
        useFactory(configService: ConfigService) {
          const host = configService.getOrThrow<string>('AUTH_SERVICE_HOST');
          const port = +configService.getOrThrow<string>('AUTH_SERVICE_PORT');

          return createTcpClientOptions(host, port);
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
