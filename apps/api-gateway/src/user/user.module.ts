import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { createKafkaClientOptions } from '@libs/common';

import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory() {
          return createKafkaClientOptions('api-user-gateway', 'api-user-gateway-consumer');
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
