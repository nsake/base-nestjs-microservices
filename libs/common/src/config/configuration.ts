function getOsEnvVar(envVarName: string): string | undefined {
  return process.env[envVarName];
}

export const configuration = () => ({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  database: {
    uri: getOsEnvVar('MONGODB_URI'),
  },

  sentry: {
    dsn: getOsEnvVar('SENTRY_DSN'),
    environment: getOsEnvVar('SENTRY_ENV'),
  },

  bot: {
    webhook: getOsEnvVar('WEBHOOK_URL'),
  },
});
