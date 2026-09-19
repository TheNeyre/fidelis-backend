module.exports = {
  apps: [
    {
      name: 'backend-server',
      script: 'src/index.js',
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '768M'
    }
  ]
};

