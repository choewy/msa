import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { AuthTopic } from '@libs/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthTopic.Login)
  login() {
    return;
  }

  @MessagePattern(AuthTopic.Register)
  register() {
    return;
  }
}
