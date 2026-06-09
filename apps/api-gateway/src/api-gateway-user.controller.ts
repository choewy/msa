import { subscribeToResponseOf } from '@libs/common';
import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('users')
export class ApiGatewayUserController implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await subscribeToResponseOf(this.client, ['get-users']);
  }

  @Get()
  getUsers() {
    return this.client.send('get-users', {});
  }
}
