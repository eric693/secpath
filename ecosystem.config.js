module.exports = {
  apps: [{
    name: 'secpath',
    script: 'server.js',
    cwd: __dirname,
    exec_mode: 'fork',
    node_args: '--env-file=.env',
    max_memory_restart: '200M'
  }]
};
