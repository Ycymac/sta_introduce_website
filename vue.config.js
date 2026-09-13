const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/(user|email)': {
        target: 'http://101.200.60.135:8084',
        changeOrigin: true,
        secure: false,
        onProxyReq(proxyReq) {
          proxyReq.removeHeader('origin')
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sta_introduce_website/'
    : '/'
})
