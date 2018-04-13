'use strict'
// 工具函数集合
const utils = require('./utils')
const webpack = require('webpack')
// 配置文件
const config = require('../config')
// webpack配置合并插件
const merge = require('webpack-merge')
const path = require('path')
// webpack的基本配置
const baseWebpackConfig = require('./webpack.base.conf')
// webpack复制文件和文件夹的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成html并且注入到.html文件中的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack错误信息提示插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
// 端口号为命令行输入的PORT参数
const PORT = process.env.PORT && Number(process.env.PORT)

// webpack的基本配置文件与当前配置文件以下内容合并
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // styleLoaders
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  // 在开发模式下，可以查看源码
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  // 搭建服务器
  devServer: {
    // 配置客户端的日志等级，这会影响到我们在浏览器开发者工具控制台里看到的日志内容
    clientLogLevel: 'warning',
    // 用于方便地开发使用了html5 History API的单页应用。这类单页应用要求服务器在针对
    // 任何命中的路由时，都返回一个对应的html文件
    historyApiFallback: {
      // 使用正则匹配命中路由
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    // 启动模块热替换功能
    // 在不刷新整个页面的情况下通过用新模块替换老模块来做到实时预览
    hot: true,
    // contentBase配置DevServer HTTP服务器的文件根目录。在默认情况下为当前的执行目录，通常是项目根目录，所以一般情况下不必设置它
    // contentBase只能用来配置暴露本地文件的规则，其属性值设置为false来关闭暴露本地文件
    contentBase: false, // since we use CopyWebpackPlugin.
    // 启动gzip压缩
    compress: true,
    // host配置项用于配置DevServer服务监听的地址
    host: HOST || config.dev.host,
    // 用于配置DevServer服务监听的端口，默认使用8080端口
    port: PORT || config.dev.port,
    // 用于在DevServer启动且第一次构建完时，自动用我们的系统的默认浏览器去打开要开发的网页
    // 本项目中设置为false
    open: config.dev.autoOpenBrowser,
    // 当程序编译出错或者警告时，浏览器全屏覆盖
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // 此路径下的打包文件可在浏览器中访问
    publicPath: config.dev.assetsPublicPath,
    // 代理到后端服务接口
    proxy: config.dev.proxyTable,
    // 启动quiet后，除了初始启动信息之外的任何内容都不会被打印到控制台
    // 这也意味着来自webpack的错误或警告在控制台不可见
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 监听模式
    watchOptions: {
      poll: config.dev.poll, //false
    }
  },
  plugins: [
    // 通过插件修改定义的变量，配置的是全局变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // 模块热替换插件（HMR）在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个html文件
    // 永远不要在生产环境(production)下启动HMR
    new webpack.HotModuleReplacementPlugin(),
    // 当开启HMR的时候使用该插件会显示模块的相对路径，建议用于开发环境
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // 在编译出现错误时，使用该插件来跳过输出阶段。这样可以确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 将index.html 作为入口，注入html代码后生成index.html文件
    new HtmlWebpackPlugin({
      // 用于生成的html文件的名称，默认是index.html
      filename: 'index.html',
      // 模板的路径
      template: 'index.html',
      // 把所有产出文件注入到给定的template或templateContent
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
