module.exports = {
  apps: [
    {
      name: 'api-daman-n',
      script: './aps/ae/daman-n/index.js',
      cwd: './',
      max_memory_restart: '256M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-daman-s',
      script: './aps/ae/daman-s/index.js',
      cwd: './',
      max_memory_restart: '256M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    }
  ]
}
