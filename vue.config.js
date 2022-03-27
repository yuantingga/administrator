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
        Element: 'element-ui'

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
  lintOnSave: false,
  devServer: {
    // 开发环境下设置为编译好以后直接打开浏览器浏览
    open: true
  },
  configureWebpack: (config) => {
    // 调试JS
    config.devtool = 'eval-source-map'
  },
  css: {
    // 查看CSS属于哪个css文件
    sourceMap: true
  }
}
