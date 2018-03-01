#learn webpack note
##概念
* chunk：每一个单独打包的文件可以成为chunk。
* 入口chunk: 被打包后页面需要引入的包，相当于一个顶层依赖。
* loader: loader通过（loader）预处理函数，为 JavaScript 生态系统提供了更多有力功能。用户现在可以更加灵活的引入细粒度逻辑，例如压缩(compression)、打包(package)、语言翻译(language translation)和其他更多。
* plugin: 如果loader是针对一中类型文件的处理，plugin则是会在整个编译打包阶段提供某种功能，所以plugin可以看作是loader的一种补充。
##webpack.config配置项

###入口起点
```javascript
config.entry = {
    '$chunkname1': '$chunkpath1',
    '$chunkname2': '$chunkpath2',
}
```
当$chunkpath为数组时，会合并成一个chunk文件。

简写: `config.entry = '$chunkpath';`

####多页应用
```js
config.entry = {
   pageOne: './src/pageOne/index.js',
   pageTwo: './src/pageTwo/index.js',
   pageThree: './src/pageThree/index.js'
 }
```
*使用 CommonsChunkPlugin 为每个页面间的应用程序共享代码创建 bundle。由于入口起点增多，多页应用能够在入口起点重用大量代码/模块，这样可以极大的从这些这些技术受益。*
>根据经验：每个 HTML 文档只使用一个入口起点。

### 打包输出output
```js
config.output = {
    filename: 'bundle.js',
    path: '/home/proj/public/assets', //必须为绝对路径
    chunkFilename: [id][name][hash][chunkhash], //非入口文件命名
}
```

##loader(加载器)
loader对不同文件类型源码的编译能力，配置灵活，
loader配置和写法：见`css-loader`示例

#####css-loader
[style-loader](https://doc.webpack-china.org/loaders/style-loader) Adds CSS to the DOM by injecting a style tag
[css-loader](http://www.css88.com/doc/webpack2/loaders/css-loader/)
`npm install css-loader -D`
`npm install style-loader -D`  //style-loader 会将css样式内联到html中
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
var htmlWebpackPlugin = require('html-webpack-plugin');
{
    //...
    plugins: [new htmlWebpackPlugin({
        title: '',
        filename: '',
        template: '',
    })]
    //...
}
```
###清理 /dist 文件夹
[clean-webpack-plugin ](https://www.npmjs.com/package/clean-webpack-plugin);
`npm install clean-webpack-plugin --save-dev`
```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
{
   //...
   plugins: [new CleanWebpackPlugin(['dist'])]
   //... 
}

```

运行时使用插件
```
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
`webpack-dev-server --open --config webpack.config`
命令行默认打开项目目录下的webpack.config.js文件，如果不是则需使用--config指定具体文件

##构建目标（target）
```
{
target: 'node',//node、web...
}
```
* 构建应用可以在客户端和服务端运行，在不同的环境运行，webpack的构建会有一些不同。（待完善）*

##模块热替换(Hot Module Replacement)
[模块热替换](https://doc.webpack-china.org/concepts/hot-module-replacement)(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

保留在完全重新加载页面时丢失的应用程序状态。
只更新变更内容，以节省宝贵的开发时间。
调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。

>指南：https://doc.webpack-china.org/guides/hot-module-replacement
>指南：https://www.jianshu.com/p/941bfaf13be1

###启用 HMR
``` 
devSever {
    hot: true,
},
plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
]
```
> 如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。
##打包优化设置

### loader

### plugins
[CommonsChunkPlugin](https://doc.webpack-china.org/plugins/commons-chunk-plugin/#-minchunks-)

`new webpack.optimize.CommonsChunkPlugin(options)`
```
new webpack.optimize.CommonsChunkPlugin({
  name: "commons",
  // ( 公共chunk(commnons chunk) 的名称)

  filename: "commons.js",
  // ( 公共chunk 的文件名)

  // minChunks: 3,
  // (模块必须被3个 入口chunk 共享)

  // chunks: ["pageA", "pageB"],
  // (只使用这些 入口chunk)
})
```

*注意：生成的common chunks 需要首先引入到html中，不然会报错

#代码分离
代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。
##动态导入
https://doc.webpack-china.org/guides/code-splitting/#-prevent-duplication-
```js
    var a = require('normal-dep');
    if ( module.hot ) {
      require.ensure(['b'], function(require) {
        var c = require('c');

        // Do something special...
      });
    }
```
###import();
###require.ensure();
动态加载的模块会被单独打包，而且 webpack.optimize.CommonsChunkPlugin插件不会抽取与其他chuanks公共的代码！
##公共代码分离
利用`CommonsChunkPlugin`将多个入口的公共代码分离出来
##动态加载和公共代码分离
公共代码抽离好处是多个入口文件的情况下，每个chunk中可能包含了大量的重复代码或模块，造成代码体积过大，还有浪费浏览器加载资源，在多页应用下，更无法缓存公共文件。
动态延时加载，可以在代码执行时根据具体情况进行加载，按需加载的模块如果在入口chunk中未引用则代码会被单独打包。这样避免了一次性打包所有代码造成打包文件过大的问题。 同时存在一个或多个模块同时被同步和按需加载模块依赖，造成代码重复打包的问题。
