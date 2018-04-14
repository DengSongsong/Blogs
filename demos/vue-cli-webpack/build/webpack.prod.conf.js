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
    // 编译输出的文件名
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有指定输出名的文件输出的文件名，非入口文件的文件名，而又需要被打包出来的文件命名配置（按需加载模块）
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
    // 分离公共js到vendor中
    new webpack.optimize.CommonsChunkPlugin({
      // 公共js文件名
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        // node_modules中的任何所需模块都提取到vendor，分离第三方库
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
    // 将webpack runtime和module manifest提取到单独文件，以防止当app包更新时导致公共vendor文件hash也更新
    // 上面虽然分离了第三方库，但每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。原因是
    // vendor包含了webpack在打包过程中产生的一些运行时代码，运行时代码中实际上保存了打包后的文件名。
    // 当修改业务代码时，业务代码的js文件的hash值必然会改变。一旦改变必然会导致vendor变化。vendor变化会导致其hash值变化
    // 下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js 
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // 提取额外异步公共代码
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
// 配置文件开启了gzip压缩
if (config.build.productionGzip) {
  // 引入压缩文件插件，该插件会对生成的文件进行压缩，生成一个.gz文件
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  // 向webpackConfig.plugins中添加如下插件
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      // 目标文件名
      asset: '[path].gz[query]',
      // 使用gzip压缩
      algorithm: 'gzip',
      // 使用正则表达式命中
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      // 资源文件大于10240B(10KB)时会被压缩
      threshold: 10240,
      // 最小压缩比达到0.8时才会被压缩
      minRatio: 0.8
    })
  )
}
// 开启包分析情况，向webpackConfig.plugins添加webpack-bundle-analyzer插件
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
