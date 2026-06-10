import { AuthTopic, subscribeToResponseOf } from '@libs/common';
import { Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('인증')
@Controller('auth')
export class AuthController implements OnModuleInit {
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
