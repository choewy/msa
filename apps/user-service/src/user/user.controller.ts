import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UserTopic } from '@libs/common';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserTopic.AuthCreated)
  createUser() {
    return this.userService.createUser();
  }
}
