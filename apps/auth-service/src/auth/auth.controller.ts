import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthLoginRequest, AuthLogoutRequest, AuthRefreshRequest, AuthRegisterRequest, AuthTopic } from '@libs/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthTopic.Login)
  login(@Payload() payload: AuthLoginRequest) {
    return this.authService.login(payload);
  }

  @MessagePattern(AuthTopic.Register)
  register(@Payload() payload: AuthRegisterRequest) {
    return this.authService.register(payload);
  }

  @MessagePattern(AuthTopic.Refresh)
  refresh(@Payload() payload: AuthRefreshRequest) {
    return this.authService.refresh(payload);
  }

  @MessagePattern(AuthTopic.Logout)
  logout(@Payload() payload: AuthLogoutRequest) {
    return this.authService.logout(payload);
  }
}
