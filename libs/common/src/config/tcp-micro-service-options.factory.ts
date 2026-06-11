import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const createTcpMicroServiceOptions = (): MicroserviceOptions => {
  return {
    transport: Transport.TCP,
    options: {
      host: process.env.TCP_HOST,
      port: +(process.env.TCP_PORT ?? ''),
    },
  };
};
