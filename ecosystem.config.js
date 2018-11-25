module.exports = {
  apps : [{
    name: 'FE-DEV',
    script: 'node_modules/react-scripts/scripts/start.js',    
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'FE',
    script: 'node_modules/serve/bin/serve.js',    
    args: '-s build',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
