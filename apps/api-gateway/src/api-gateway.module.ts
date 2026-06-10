import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
