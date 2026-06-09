import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
  @MessagePattern('login')
  login() {
    return;
  }

  @MessagePattern('register')
  register() {
    return;
  }
}
