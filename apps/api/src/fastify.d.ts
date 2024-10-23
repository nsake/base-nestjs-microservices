import 'fastify';
import { SynchronizationProcess } from '@app/middlewares/synchronization-balance/responses';
import { UserDocument } from '@apps/user/src/user-app/schemas/user.schema';

interface UserSyncData {
  userId?: string;
  user?: UserDocument;
  syncData?: SynchronizationProcess;
}

declare module 'fastify' {
  interface FastifyRequest extends UserSyncData {
    raw?: UserSyncData;
  }
}

declare module 'http' {
  interface IncomingMessage extends UserSyncData {}
}
