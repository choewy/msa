import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserTopic } from '@libs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserTopic.Create)
  createUser() {
    return this.userService.createUser();
  }
}
