module.exports = {
  apps: [
    {
      name: 'api-8888',
      script: './aps/us/8888/index.js',
      cwd: './',
      //    max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-bugrashov',
      script: './aps/il/bugrashov/index.js',
      cwd: './',
      //    max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null' // send logs to /dev/null
    },
    {
      name: 'api-daman-n',
      script: './aps/ae/daman/index.js',
      cwd: './',
      //    max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null' // send logs to /dev/null
    },
    {
      name: 'api-menlo-a',
      script: './aps/us/menloa/index.js',
      cwd: './',
      //    max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-menlo-b',
      script: './aps/us/menlob/index.js',
      cwd: './',
      //    max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-muse',
      script: './aps/us/muse/index.js',
      cwd: './',
      max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-spire',
      script: './aps/us/spire/index.js',
      cwd: './',
      //    max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    }
  ]
}
