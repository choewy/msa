import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const createKafkaMicroServiceOptions = (
  clientId: string,
  groupId: string,
): MicroserviceOptions => {
  const brokers = process.env.KAFKA_BROKERS?.split(',') ?? [];

  return {
    transport: Transport.KAFKA,
    options: {
      client: { clientId, brokers },
      consumer: { groupId },
    },
  };
};
