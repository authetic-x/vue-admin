const path = require('path')

const port = process.env.port || process.env.npm_config_port || 9527

module.exports = {
  devServer: {
    port,
    open: true,
    // ??
    overlay: {
      warnings: true,
      errors: true,
    },
    before: require('./mock/mock-server')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  }
}