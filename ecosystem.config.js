module.exports = {
  apps: [
    {
      name: 'backend-server', 
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      exec_mode: 'cluster', 
      instances: 'max', 
      watch: true, 
      max_memory_restart: '768M' 
    }
  ]
};