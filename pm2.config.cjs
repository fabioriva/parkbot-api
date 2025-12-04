module.exports = {
  apps: [
    {
      name: 'daman-n',
      script: './aps/ae/daman/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null' // send logs to /dev/null
    },
    {
      name: 'daman-n-map',
      script: './aps/ae/daman/map.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'menlo-a',
      script: './aps/us/menloa/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'menlo-b',
      script: './aps/us/menlob/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    }
  ]
}
