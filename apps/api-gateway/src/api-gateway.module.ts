import { Module } from '@nestjs/common';
import { ApiGatewayUserController } from './api-gateway-user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { createKafkaClientOptions } from '@libs/common';
import { ApiGatewayAuthController } from './api-gateway-auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/api-gateway/.env', 'apps/api-gateway/.env.local'],
    }),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory() {
          return createKafkaClientOptions(
            'api-gateway',
            'api-gateway-consumer',
          );
        },
      },
    ]),
  ],
  controllers: [ApiGatewayAuthController, ApiGatewayUserController],
  providers: [],
})
export class ApiGatewayModule {}
