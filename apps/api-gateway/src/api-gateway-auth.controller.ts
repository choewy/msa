import { subscribeToResponseOf } from '@libs/common';
import { Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('auth')
export class ApiGatewayAuthController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await subscribeToResponseOf(this.client, ['auth.login', 'auth.register']);
  }

  @Post('login')
  login() {
    return this.client.send('auth.login', {});
  }

  @Post('register')
  register() {
    return this.client.send('auth.register', {});
  }
}
