module.exports = {
  apps: [
    {
      name: 'api-chiattone',
      script: './aps/ch/chiattone/index.js',
      cwd: './',
      max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-donini',
      script: './aps/ch/donini/index.js',
      cwd: './',
      max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-hotel-dante',
      script: './aps/ch/hdante/index.js',
      cwd: './',
      max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-saint-moritz',
      script: './aps/ch/smoritz/index.js',
      cwd: './',
      max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    }
  ]
}
