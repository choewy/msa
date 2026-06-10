import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSessionEntity } from './entities/auth-session.entity';
import { AuthUserEntity } from './entities/auth-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUserEntity, AuthSessionEntity]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
