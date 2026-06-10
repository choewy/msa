import { ClientKafka } from '@nestjs/microservices';

import { Request } from 'express';
import { Kafka } from 'kafkajs';
import { UAParser } from 'ua-parser-js';

export async function subscribeToResponseOf(client: ClientKafka, patterns: string[]) {
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

export function getRequestInfo(req: Request) {
  const parser = new UAParser(req.headers['user-agent']);
  const result = parser.getResult();

  return {
    ipAddress: req.ip ?? req.socket.remoteAddress ?? null,
    userAgent: [result.browser.name, result.browser.version, result.os.name, result.device.type ?? 'Desktop'].filter(Boolean).join(' | '),
  };
}
