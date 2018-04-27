<p>
现在做前端开发，如果不懂一种自动化构建工具的话，可以说是一位不称职的前端程序猿了，自己接触前端也有几个月的时间了，但是一直没有很好的学习一种自动化构建工具，是要好好的学习一种自动化构建工具，提高自己的技术储备。如今前端技术发展迅速，构建工具也出现了很多，例如：Grunt、Gulp、Rollup、parcel、webpack等。目前自己主要学习webpack。本篇文章主要记录自己对webpack的学习。
怎么学webpack,这是我在比较全面学习webpack前期主要思考的问题，该怎么做能够比较好的学习webpack。目前自己用到的主要前端框架是vue，vue中提供了一个很全面的项目构建的方式，其中就有以webpack为基础的脚手架，在一段的vue的学习时间中，并没有花时间在项目搭建的学习上，只是知道怎么去用，更多的时间花在vue的语法使用上。实际上vue的脚手架是自己入手学习的webpack一种不错的学习途径。
下面以一个学习者的身份对vue-cli做一个详细的解析，按照官方提供的搭建方式和结合自身的情况对vue-cli做了以下的学习记录，因为初次深入接触webpack，定有错误、不深入的理解解释，欢迎大家提出自己的想法和建议，一起学习一起进步~
</p>

## vue-cli 创建

```
vue init webpack vue-cli-webpack //具体创建请参考vue官网的搭建方式
```
* vue-cli 版本：2.9.2
* vue 版本：2.5.2
* webpack 版本：3.6.0(目前webpack的版本已到4.5.0)

##  webpack定义
<p>
webpack是一个javascript的静态模块打包器，在webpack里一切文件皆模块，通过loader转换文件，通过plugin注入钩子，最后输出由多个模块组合成的文件。其专注于构建模块化项目。
</p>

## webpack基本配置
<p>本部分内容以webpack.base.conf.js文件内容为基础</p>

### 入口 Entry

```
module.exports = {
 // 基础目录，context默认为执行启动webpack时所在的当前工作目录
  context: path.resolve(__dirname, '../'), // 项目根目录 F:\workspace\vue-cli-webpack
  // 起点入口
  entry: {
    //本项目中entry是一个object(可能会出现多个Chunk)，此时Chunk的名称是object键值对中键的名称
    // 如果entry是一个string或array，就只生成一个Chunk，这时Chunk的名称是main
    app: './src/main.js'
  }
}
```
* context：webpack在寻找相对路径的文件时会以context为根目录，context默认为执行启动webpack时所在的当前工作目录。用于从配置中解析入口起点和loader
* entry：类型有三种：string、array、object，本项目中entry是一个object。应用程序的起点入口，配置模块的入口，webpack执行构建的第一步将从入口开始。

### 输出 Output

```
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
  }
```
* output：配置如何输出最终想要的代码，类型是一个object，里面包含了一系列的配置项
* process.env.NODE_ENV：为node的环境变量，在vue的实际项目开发中，分为开发环境和生产环境，即在webpack打包的过程中需要区分开发环境和生产环境

## 解析 Resolve

```
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
  }
```

### 模块 Module

```
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
          // 文件名为name.7位hash的值.扩展名
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
  }
```
* rules：配置模块的读取和解析规则，通常用来配置Loader。其类型是一个array，数组中的每一项都描述了如何处理部分文件
* rules配置方式：
    - 条件配置：通过test、include、exclude三个配置来选中Loader要应用规则的文件
    - 应用规则：对选中的文件通过use配置项来应用Loader，可以只应用一个Loader或者按照从右到左的顺序应用一组Loader，同时可以分别向Loader传入参数
    - 重置顺序：一组Loader的执行顺序默认是从右到左执行的，通过enforce选项可以将其中一个Loader的执行顺序放到最前或者最后
* options：类型为一个Object，传入更多的参数

### 