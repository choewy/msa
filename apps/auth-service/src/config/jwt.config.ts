import { ConfigService, registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export const jwtConfig = registerAs('JWT_CONFIG', (): { access: JwtSignOptions; refresh: JwtSignOptions } => {
  const configService = new ConfigService();

  return {
    access: {
      secret: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: `${configService.get<number>('JWT_ACCESS_EXPIRES_IN_MINUTES') ?? '15'}m`,
    },
    refresh: {
      secret: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: `${configService.get<number>('JWT_REFRESH_EXPIRES_IN_DAYS') ?? '7'}d`,
    },
  };
});
