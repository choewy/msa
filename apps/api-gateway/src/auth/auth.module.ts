import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { createKafkaClientOptions } from '@libs/common';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory() {
          return createKafkaClientOptions('api-auth-gateway', 'api-auth-gateway-consumer');
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
