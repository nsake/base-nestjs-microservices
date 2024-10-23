import { ClientOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

export const userClientOptions: ClientOptions = {
  transport: Transport.NATS,
  options: {
    servers: [`nats://${process.env.NATS_HOST}:${process.env.NATS_PORT}`],
    queue: 'grand_combat_app_user',
    maxReconnectAttempts: -1,
    reconnectTimeWait: 5000,
  },
};
