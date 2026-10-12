/*
 * @description: 描述信息
 * @Author: Cheng kaixuan
 * @Date: 2024-01-18 13:55:21
 * @LastEditors: why
 * @LastEditTime: 2025-03-03 10:35:45
 */

module.exports = {
  //路径前缀
  assetsDir: 'static',
  publicPath: "static/",
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      "element-ui": "ELEMENT"
    })
    const entry = config.entry("app")
    entry.add("babel-polyfill").end()
    entry.add("classlist-polyfill").end()
    entry.add("@/mock").end()
  },
  css: {
    extract: { ignoreOrder: true }
  },
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    hot: true, // 启用热更新
    port: 1888,
    proxy: {
      "/api": {
        target: "http://82.156.224.174:801",
        //本地服务接口地址
        // target: 'http://localhost',
        //远程演示服务地址,可用于直接启动项目
        // target: 'https://saber.bladex.vip/api',
        ws: true,
        changeOrigin: true, // 是否跨域
        logLevel: "debug",
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
