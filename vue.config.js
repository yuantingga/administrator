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
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
