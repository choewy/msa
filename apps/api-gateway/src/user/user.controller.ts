import { Controller, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { subscribeToResponseOf, UserTopic } from '@libs/common';

@ApiTags('사용자')
@Controller('users')
export class UserController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await subscribeToResponseOf(this.client, Object.values(UserTopic));
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
