import { AuthTopic, subscribeToResponseOf } from '@libs/common';
import { Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('auth')
export class ApiGatewayAuthController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await subscribeToResponseOf(this.client, Object.values(AuthTopic));
  }

  @Post('login')
  login() {
    return this.client.send(AuthTopic.Login, {});
  }

  @Post('register')
  register() {
    return this.client.send(AuthTopic.Register, {});
  }
}
