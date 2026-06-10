import { ConfigService, registerAs } from '@nestjs/config';

export const apiGatewayConfig = registerAs('API_GATEWAY_CONFIG', () => {
  const configService = new ConfigService();
  const cors = {
    origin: new RegExp(configService.getOrThrow<string>('CORS_ORIGIN')),
    credentials: true,
  };

  return {
    port: +configService.getOrThrow<string>('PORT'),
    hostname: configService.getOrThrow<string>('HOST'),
    cors,
  };
});
