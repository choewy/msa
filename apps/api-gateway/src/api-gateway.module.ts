import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/api-gateway/.env.local', 'apps/api-gateway/.env'],
    }),
    AuthModule,
    UserModule,
  ],
})
export class ApiGatewayModule {}
