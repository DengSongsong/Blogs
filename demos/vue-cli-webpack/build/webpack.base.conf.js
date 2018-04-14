'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

/**
 * @author DengSongsong
 * @method resolve
 * @param {String} dir 相对于本文件的路径
 * @return {String} 绝对路径 
 */
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  // 基础目录，context默认为执行启动webpack时所在的当前工作目录
  context: path.resolve(__dirname, '../'), // 项目根目录 F:\workspace\vue-cli-webpack
  // 起点入口
  entry: {
    //本项目中entry是一个object(可能会出现多个Chunk)，此时Chunk的名称是object键值对中键的名称
    // 如果entry是一个string或array，就只生成一个Chunk，这时Chunk的名称是main
    app: './src/main.js'
  },
  //输出，配置如何输出最终想要的代码，output是一个object，包含了一组配置项
  output: {
    // 配置输出文件存放在本地的目录，必须是string类型的绝对路径
    path: config.build.assetsRoot,//F:\workspace\vue-cli-webpack\dist
    // 配置输出文件的名称，Chunk名称来区分输出的文件名
    filename: '[name].js',
    // publicPath配置发布到线上资源的URL前缀，为string类型。
    // 默认值是空字符串''，即使用相对路径
    // 该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，此选项的值都会以/结束
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 配置webpack如何寻找模块所对应的文件，模块如何被解析
  resolve: {
    // 在导入语句没带文件后缀时，webpack会自动带上后缀后去尝试访问文件是否存在，extension
    // 用于配置在尝试过程中用到的后缀列表
    extensions: ['.js', '.vue', '.json'],
    // alias通过别名来将原导入路径映射成一个新的导入路径，确保模块引入变得更简单
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // 配置处理模块的规则
  module: {
    // rules是数组，创建模块时，匹配请求的规则数组。主要用来配置模块的读取和解析规则，通常
    // 用来配置loader
    rules: [
      {
        // 命中vue文件，用正则表达式匹配到相对应的文件
        test: /\.vue$/,
        // 用vue-loader转换vue文件，将其转换为js文件
        loader: 'vue-loader',
        // 传入参数，是一个object
        options: vueLoaderConfig
      },
      {
        // 编译js
        test: /\.js$/,
        loader: 'babel-loader',
        // 只命中以下目录文件
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        // 处理图片等资源文件
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // limit用于控制在文件的大小小于limit时才使用url-loader
          // 将小于10k资源转成base64编码的dataURL字符串到代码中
          limit: 10000,
          // 其他资源转移到静态资源文件夹
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        // 处理多媒体资源等文件
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        // // 处理字体文件
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
