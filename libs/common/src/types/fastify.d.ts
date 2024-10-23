import 'fastify';
import '@fastify/secure-session';

declare module '@fastify/secure-session' {
  interface SessionData {
    sessionId: string;
    role: string;
  }
}
