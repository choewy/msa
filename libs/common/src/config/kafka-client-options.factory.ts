import { ClientOptions, Transport } from '@nestjs/microservices';

export const createKafkaClientOptions = (
  clientId: string,
  groupId: string,
): ClientOptions => {
  const brokers = process.env.KAFKA_BROKERS?.split(',') ?? [];

  return {
    transport: Transport.KAFKA,
    options: {
      client: { clientId, brokers },
      consumer: { groupId },
    },
  };
};
