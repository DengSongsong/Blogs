'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
/**
 * @author DengSongsong
 * @method assetsPath 资源文件的存放路径
 * @param {String} _path
 * @return {String} 
 */
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}
/**
 * @author DengSongsong
 * 生成处理css的loaders配置
 * @method cssLoaders
 * @param {Object} options生成的配置
 * options = {
 *  sourceMap: true
 *  extract: true
 * } 
 * @return {Object} 处理css的loaders的配置对象
 */
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  /**
   * @author DengSongsong
   * @param {Array} loader
   * @param {String | Object} loaderOptions
   * @return {String | Object} ExtractTextPlugin对象或loader字符串
   */
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // 当extract为true时，提取css，生成环境中，默认为true
    if (options.extract) {
      return ExtractTextPlugin.extract({
        // 处理的loader
        use: loaders,
        // 没有被提取分离时使用的loader
        fallback: 'vue-style-loader'
      })
    } else {
      // 无需提取样式则简单使用vue-style-loader配合各种样式loader去处理<style>里面的样式
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // 返回css类型对应的loader组成的对象generateLoaders()来生成loader
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
/**
 * @author DengSongsong
 * @method styleLoaders
 * @param {Object} options生成配置
 * @return {Array} style-loader的配置 
 */
exports.styleLoaders = function (options) {
  // 定义返回的数组，数组中保存的是针对各类的样式文件的处理方式
  const output = []
  // 调用cssLoaders方法返回各类型的样式对象
  const loaders = exports.cssLoaders(options)

  // 循环遍历loaders
  for (const extension in loaders) {
    // 根据遍历获得的key(extension)来得到value(loader)
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
