import { subscribeToResponseOf, UserTopic } from '@libs/common';
import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('사용자')
@Controller('users')
export class UserController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await subscribeToResponseOf(this.client, Object.values(UserTopic));
  }
}
