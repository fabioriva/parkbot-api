module.exports = {
  apps: [
    {
      name: 'api-daman-n',
      script: './aps/ae/daman/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    }
  ]
}
