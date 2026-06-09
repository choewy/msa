import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ApiGatewayUserController } from './api-gateway-user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { createKafkaClientOptions } from '@libs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/api-gateway/.env', 'apps/api-gateway/.env.local'],
    }),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory() {
          return createKafkaClientOptions(
            'api-gateway',
            'api-gateway-consumer',
          );
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController, ApiGatewayUserController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
