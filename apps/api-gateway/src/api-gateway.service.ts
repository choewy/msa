import { subscribeToResponseOf } from '@libs/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await subscribeToResponseOf(this.userClient, ['get-users']);
  }
}
