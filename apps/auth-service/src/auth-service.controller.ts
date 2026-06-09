import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
  @MessagePattern('auth.login')
  login() {
    return;
  }

  @MessagePattern('auth.register')
  register() {
    return;
  }
}
