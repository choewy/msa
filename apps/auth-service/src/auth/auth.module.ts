import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsEntity } from './entities/credentials.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialsEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
