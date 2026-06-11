import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { createTcpClientOptions } from '@libs/common';

import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_CLIENT',
        inject: [ConfigService],
        useFactory(configService: ConfigService) {
          const host = configService.getOrThrow<string>('USER_SERVICE_HOST');
          const port = +configService.getOrThrow<string>('USER_SERVICE_PORT');

          return createTcpClientOptions(host, port);
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
