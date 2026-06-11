import { ClientOptions, Transport } from '@nestjs/microservices';

export const createTcpClientOptions = (host: string, port: number): ClientOptions => {
  return {
    transport: Transport.TCP,
    options: {
      host,
      port,
    },
  };
};
