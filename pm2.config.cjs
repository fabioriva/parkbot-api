module.exports = {
  apps: [
    {
      name: 'api-8888',
      script: './aps/us/8888/index.js',
      cwd: './',
      // max_memory_restart: '150M',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null' // send logs to /dev/null
    },
    {
      name: 'api-alumim',
      script: './aps/il/alumim/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-aminadav-16',
      script: './aps/il/aminadav16/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-aminadav-1820',
      script: './aps/il/aminadav1820/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-bugrashov',
      script: './aps/il/bugrashov/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-chiattone',
      script: './aps/ch/chiattone/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-daman-n',
      script: './aps/ae/daman/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-donini',
      script: './aps/ch/donini/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-ehad',
      script: './aps/il/ehad/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-gazit',
      script: './aps/il/gazit/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-herzel',
      script: './aps/il/herzel/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-hotel-dante',
      script: './aps/ch/hdante/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-ironbank',
      script: './aps/nz/ironbank/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-kaveri-gold',
      script: './aps/in/kg/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-matalon',
      script: './aps/il/matalon/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-menlo-a',
      script: './aps/us/menloa/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-menlo-b',
      script: './aps/us/menlob/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-muse',
      script: './aps/us/muse/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-ruth',
      script: './aps/il/ruth/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-saint-moritz',
      script: './aps/ch/smoritz/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-spire',
      script: './aps/us/spire/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-trumpeldor',
      script: './aps/il/trumpeldor/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-wblvd',
      script: './aps/il/wblvd/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    },
    {
      name: 'api-wolfson',
      script: './aps/il/wolfson/index.js',
      cwd: './',
      node_args: '-r dotenv/config',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      out_file: '/dev/null'
    }
  ]
}
