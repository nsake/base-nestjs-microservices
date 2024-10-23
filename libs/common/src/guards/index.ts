import { SessionGuard } from '@common/guards/session.guard';

export * from './session.guard';

export const GUARDS = [SessionGuard];
