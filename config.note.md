##入口起点
config.entry = {
    '$chunkname1': '$chunkpath1',
    '$chunkname2': '$chunkpath2',
}
当$chunkpath为数组时，会合并成一个chunk文件。

简写
config.entry = '$chunkpath';

###多页应用

config.entry = {
   pageOne: './src/pageOne/index.js',
   pageTwo: './src/pageTwo/index.js',
   pageThree: './src/pageThree/index.js'
 }

*使用 CommonsChunkPlugin 为每个页面间的应用程序共享代码创建 bundle。由于入口起点增多，多页应用能够在入口起点重用大量代码/模块，这样可以极大的从这些这些技术受益。*
>根据经验：每个 HTML 文档只使用一个入口起点。

##打包输出

```js
config.output = {
    filename: 'bundle.js',
    path: '/home/proj/public/assets', //必须为绝对路径
    chunkFilename: [id][name][hash][chunkhash], //非入口文件命名

}
```

##module
###loader
####Loader 特性
* loader 支持链式传递。能够对资源使用流水线(pipeline)。loader 链式地按照先后顺序进行编译。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
* loader 可以是同步或异步函数。
* loader 运行在 Node.js 中，并且能够执行任何可能的操作。
* loader 接收查询参数。用于 loader 间传递配置。
* loader 也能够使用 options 对象进行配置。
* 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
插件(plugin)可以为 loader 带来更多特性。
* loader 能够产生额外的任意文件。
* loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多有力功能。用户现在可以更加灵活的引入细粒度逻辑，例如压缩(compression)、打包(package)、语言翻译(language translation)和其他更多。
[style-loader](https://doc.webpack-china.org/loaders/style-loader) Adds CSS to the DOM by injecting a <style> tag

#####css-loader
使用[css-loader](http://www.css88.com/doc/webpack2/loaders/css-loader/)
`npm install css-loader -D`
'npm install style-loader -D'  //style-loader 会将css样式内联到html中
```js
config.module = {
   rules: [
    {test: '/\.css$/', use: ['style-loader', 'css-loader']}
   ]
}
```

##plugins

###htmlWebpackPlugin
npm install -D html-webpack-plugin
```js
var htmlWebpackPlugin = require('html-webpack-plugin')
plugins: [new htmlWebpackPlugin({
    title: '',
    filename: '',
    template: '',
})]
```
###清理 /dist 文件夹
[clean-webpack-plugin ](https://www.npmjs.com/package/clean-webpack-plugin);
`npm install clean-webpack-plugin --save-dev`
```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
...
new CleanWebpackPlugin(['dist']),
...
```

运行时使用插件
```js
  const webpack = require('webpack'); //运行时(runtime)访问 webpack
  const configuration = require('./webpack.config.js');

  let compiler = webpack(configuration);
  compiler.apply(new webpack.ProgressPlugin());

  compiler.run(function(err, stats) {
    // ...
  });
```
##dev-server、webpack-dev-middleware


`npm install webpack-dev-server --save-dev`
`webpack-dev-server --open` --config webpack.config
命令行默认打开项目目录下的webpack.config.js文件，如果不是则需使用--config指定具体文件

##构建目标（target）
```
{
target: 'node',//node、web...
}
```
构建应用可以在客户端和服务端运行，在不同的环境运行，webpack的构建会有一些不同。（待完善）

##模块热替换(Hot Module Replacement)
[模块热替换](https://doc.webpack-china.org/concepts/hot-module-replacement)(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

保留在完全重新加载页面时丢失的应用程序状态。
只更新变更内容，以节省宝贵的开发时间。
调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。

>指南：https://doc.webpack-china.org/guides/hot-module-replacement
>指南：https://www.jianshu.com/p/941bfaf13be1
启用 HMR
devSever {
    hot: true,
}
plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
]
> 如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。
##打包优化设置
