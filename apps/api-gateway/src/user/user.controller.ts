import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
  ) {}
}
