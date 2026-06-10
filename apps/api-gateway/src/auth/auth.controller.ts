import { Body, Controller, Delete, Inject, OnModuleDestroy, OnModuleInit, Post, Req, Res } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

import { AuthTokenResponse, AuthTopic, getRequestInfo, subscribeToResponseOf } from '@libs/common';

import { LoginRequestDTO } from './dto/login.dto';
import { RegisterRequestDTO } from './dto/register.dto';
import { AuthTokenResponseDTO } from './dto/token.dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await subscribeToResponseOf(this.client, Object.values(AuthTopic));
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Post('login')
  @ApiCreatedResponse({ type: AuthTokenResponseDTO })
  async login(@Req() req: Request, @Body() body: LoginRequestDTO, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...value } = await firstValueFrom<AuthTokenResponse>(this.client.send(AuthTopic.Login, { ...body, ...getRequestInfo(req) }));

    res.setHeader('Cache-Control', 'no-store');
    res.cookie('msa-refresh-token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return value;
  }

  @Post('register')
  @ApiCreatedResponse({ type: AuthTokenResponseDTO })
  async register(@Req() req: Request, @Body() body: RegisterRequestDTO, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...value } = await firstValueFrom<AuthTokenResponse>(this.client.send(AuthTopic.Register, { ...body, ...getRequestInfo(req) }));

    res.setHeader('Cache-Control', 'no-store');
    res.cookie('msa-refresh-token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return value;
  }

  @Post('refresh')
  @ApiCreatedResponse({ type: AuthTokenResponseDTO })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookies = req.cookies as Record<string, string>;
    const { refreshToken, ...value } = await firstValueFrom<AuthTokenResponse>(
      this.client.send(AuthTopic.Refresh, { refreshToken: cookies['msa-refresh-token']?.trim() ?? '', ...getRequestInfo(req) }),
    );

    res.setHeader('Cache-Control', 'no-store');
    res.cookie('msa-refresh-token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return value;
  }

  @Delete('logout')
  @ApiNoContentResponse()
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookies = req.cookies as Record<string, string>;
    await firstValueFrom(this.client.send(AuthTopic.Logout, { refreshToken: cookies['msa-refresh-token']?.trim() ?? '' }));

    res.setHeader('Cache-Control', 'no-store');
    res.cookie('msa-refresh-token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
      maxAge: 0,
    });
  }
}
