const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
})
module.exports = {

  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      // 打包
      config.entry('app').clear().add('./src/main-prod.js')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        echarts: 'echarts',
        nprogress: 'nprogress',
        VueQuillEditor: 'vue-quill-editor',
        moment: 'moment',
        'element-ui': 'ELEMENT'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      // 开发
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    headers: {
      // 允许跨域的源url地址
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      // 这里监听一个别名，下面替换掉
      '/api': { // 这里最好有一个 /
        target: 'https://www.liulongbin.top:8888/api/private/v1/', // 后台接口域名
        // ws: true,
        // 如果要代理 webSockets，配置这个参数
        // secure: false,
        // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 替换成
        }
      }
    }
  }
}
