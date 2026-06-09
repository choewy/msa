import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('users')
export class ApiGatewayUserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  @Get()
  getUsers() {
    return this.client.send('get-users', {});
  }
}
