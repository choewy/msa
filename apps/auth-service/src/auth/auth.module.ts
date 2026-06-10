import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserEntity } from './entities/auth-user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthSessionEntity } from './entities/auth-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUserEntity, AuthSessionEntity]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
