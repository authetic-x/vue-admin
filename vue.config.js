const path = require('path')

const port = process.env.port || process.env.npm_config_port || 9527

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

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
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}