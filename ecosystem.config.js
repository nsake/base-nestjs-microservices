module.exports = {
  apps: [
    // API PRODUCTION
    {
      name: 'st-crm-main',
      script: 'yarn',
      args: ['start:prod'],
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },

    {
      name: 'st-crm-main-user',
      script: 'yarn',
      args: ['start:prod:user'],
      env: {
        NODE_ENV: 'main',
      },
    },

    // API STAGE
    {
      name: 'st-crm-stage',
      script: 'yarn',
      args: ['start:prod'],
      increment_var: 'PORT',
      env: {
        NODE_ENV: 'stage',
        PORT: 5000,
      },
    },
    {
      name: 'st-crm-stage-user',
      script: 'yarn',
      args: ['start:prod:user'],
      env: {
        NODE_ENV: 'stage',
      },
    },

    // API DEV
    {
      name: 'st-crm-development',
      script: 'yarn',
      args: ['start:prod'],
      increment_var: 'PORT',
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },
    },
    {
      name: 'st-crm-development-user',
      script: 'yarn',
      args: ['start:prod:user'],
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
