import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CredentialsEntity } from './entities/credentials.entity';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CredentialsEntity)
    private readonly credentialsRepository: Repository<CredentialsEntity>,
  ) {}

  login(dto: LoginDTO) {
    return dto;
  }

  register(dto: RegisterDTO) {
    return dto;
  }
}
