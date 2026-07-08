module.exports = {
  apps: [
    {
      name: 'api-daman-n',
      script: './aps/ae/daman/index.js',
      cwd: './',
      max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    }
  ]
}
