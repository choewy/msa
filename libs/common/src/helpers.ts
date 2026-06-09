import { ClientKafka } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';

export async function subscribeToResponseOf(
  client: ClientKafka,
  patterns: string[],
) {
  for (const pattern of patterns) {
    client.subscribeToResponseOf(pattern);
  }

  await client.connect();
}

export async function createTopics(kafka: Kafka, topics: string[]) {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    waitForLeaders: true,
    topics: topics.map((topic) => ({
      topic,
      numPartitions: 1,
      replicationFactor: 1,
    })),
  });

  await admin.disconnect();
}
