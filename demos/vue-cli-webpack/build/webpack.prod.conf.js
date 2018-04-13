'use strict'
const path = require('path')
// 工具函数集合
const utils = require('./utils')
const webpack = require('webpack')
// 配置文件
const config = require('../config')
// webpack配置合并插件
const merge = require('webpack-merge')
// webpack基本配置
const baseWebpackConfig = require('./webpack.base.conf')
// webpack复制文件和文件夹的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成html并且注入到.html文件中的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取css的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// webpack优化压缩和优化css的插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩输出的javascript代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 变量环境
const env = require('../config/prod.env')

// webpack的基本配置文件与当前配置文件以下内容合并
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    // styleLoaders
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  // 是否开启sourceMap
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    // 编译输出的静态资源根路径
    path: config.build.assetsRoot,
    // 便宜输出的文件名
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有指定输出名的文件输出的文件名
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // 通过插件修改定义的变量，配置的是全局变量
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 压缩输出的js代码
    new UglifyJsPlugin({
      // 参数
      uglifyOptions: {
        compress: {
          // 在UglifyJS删除没有用到的代码时不输出警告
          warnings: false
        }
      },
      // 不开启sourceMap
      // 使用 source map 将错误信息的位置映射到模块（这会减慢编译的速度） 
      sourceMap: config.build.productionSourceMap,
      // 使用多进程并行运行和文件缓存来提高构建速度
      parallel: true
    }),
    // // 提取出javascript代码里的css到单独文件中
    // extract css into its own file
    new ExtractTextPlugin({
      // 生成文件的文件名
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 压缩提取出来的css
    // 可以删除来自不同组件的冗余代码
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 将index.html作为入口，注入html代码后生成index.html文件
    new HtmlWebpackPlugin({
      // 用于生成的html文件的名称，默认是index.html
      filename: config.build.index,
      // 模板的路径
      template: 'index.html',
      // 把所有产出文件注入到给定的template或templateContent
      inject: true,
      // 压缩配置
      minify: {
        // 删除html中的注释代码
        removeComments: true,
        // 删除html中的空白符
        collapseWhitespace: true,
        // 删除html元素中属性的引号
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 必须通过CommonsChunkPlugin一致的处理多个chunks
      // 按dependency的顺序引入
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting  作用域提升
    // 过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。这些打包函数使你的 JavaScript 在浏览器中处理的更慢
    // 该插件作用是提升或者预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    // 复制静态文件，将static文件内的内容复制到制定文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
