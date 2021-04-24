const path = require('path')

module.exports = {
  future: {
    webpack5: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules')],
  },
  webpack: (config, options) => {
    config.resolve.fallback = {
      path: false,
      fs: false
    }
    return config
  }
}
