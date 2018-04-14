'use strict'
// 检查nodeJS和npm的版本
require('./check-versions')()

process.env.NODE_ENV = 'production'
// loading插件
const ora = require('ora')
// 可以在node中执行`rm-rf`的工具
const rm = require('rimraf')
const path = require('path')
// 在终端输出带颜色的文字的插件
const chalk = require('chalk')
const webpack = require('webpack')
// 配置文件
const config = require('../config')
// 生产环境文件
const webpackConfig = require('./webpack.prod.conf')
// 在终端显示loading效果，并输出提示
const spinner = ora('building for production...')
// 开启loading动画
spinner.start()
// 将整个dist文件夹以及里面的内容删除，以免遗留旧的没用的文件
// 删除完成后才开始webpack构建打包
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 执行webpack构建打包，完成之后在终端输出构建完成的相关信息或者输出报错信息并退出程序
  webpack(webpackConfig, (err, stats) => {
    // 停止loading
    spinner.stop()
    if (err) throw err
    // 在编译完成的回调函数中，在终端输出编译的文件
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    // 打印提示
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
