# learn webpack note

## 用例版本：4.7.2
>[指南](https://webpack.docschina.org/guides/installation/)
>[api](https://webpack.docschina.org/api/cli/)
>[完整配置示例](https://webpack.docschina.org/configuration/)

## 概念
* resolve: 用于帮助找到模块的绝对路径。一个模块可以作为另一个模块的依赖模块，然后被后者引用
* chunk：每一个单独打包的文件可以成为chunk。
* 入口chunk: 被打包后页面需要引入的包，相当于一个顶层依赖。
* 模块：webpack中一切资源都可以作为模块。 cmd (require) amd(define,require) es2015 css(url @import) html(src)都可以视为模块依赖。非js模块需要使用对应的loader加载
* loader: webpack自身只支持 JavaScript,而loader 描述了 webpack 如何处理 非 JavaScript(non-JavaScript) 模块，并且在bundle中引入这些依赖。loader通过（loader）预处理函数，为 JavaScript 生态系统提供了更多有力功能。用户现在可以更加灵活的引入细粒度逻辑，例如压缩(compression)、打包(package)、语言翻译(language translation)和其他更多。
* 模块解析(Module Resolution)：
* plugin: 如果loader是针对一中类型文件的处理，plugin则是会在整个编译打包阶段提供某种功能，所以plugin可以看作是loader的一种补充。
* Source Maps: 源码和打包编译后的代码索引。当 JavaScript 异常抛出时，你会想知道这个错误发生在哪个文件的哪一行。然而因为 webpack 将文件输出为一个或多个 bundle，所以追踪这一错误会很不方便。
* runtime: 在浏览器运行时，webpack 用来连接模块化的应用程序的所有代码。runtime 包含：在模块交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。
* mainifest: 当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "Manifest"，当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。

## webpack默认构建信息
当运行构建命令成功时，webpack默认会打印构建信息
asset 列对应的是打包成单独的文件包，chunks为id名,
## webpack.config配置项
### 入口起点
```javascript
config.entry = {
    '$chunkname1': '$chunkpath1',
    '$chunkname2': '$chunkpath2',
}
```
当$chunkpath为数组时，会合并成一个chunk文件。

简写: `config.entry = '$chunkpath';`

#### 多页应用
```js
config.entry = {
   pageOne: './src/pageOne/index.js',
   pageTwo: './src/pageTwo/index.js',
   pageThree: './src/pageThree/index.js'
 }
```
*使用 CommonsChunkPlugin 为每个页面间的应用程序共享代码创建 bundle。由于入口起点增多，多页应用能够在入口起点重用大量代码/模块，这样可以极大的从这些这些技术受益。*
*根据经验：每个 HTML 文档只使用一个入口起点。* 

### 打包输出output
```js
config.output = {
    filename: 'bundle.js',
    path: '/home/proj/public/assets', //必须为绝对路径
    chunkFilename: [id][name][hash][chunkhash], //非入口文件命名
}
```

## loader(加载器)
loader对不同文件类型源码的编译能力，配置灵活，
loader配置和写法：见`css-loader`示例

*注意，loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是有很必要的，因为这可以使开发人员创建出更准确的依赖关系图。* 

在更高层面，在 webpack 的配置中 loader 有两个特征：

* test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
* use 属性，表示进行转换时，应该使用哪个 loader。

*重要的是要记得，在 webpack 配置中定义 loader 时，要定义在 module.rules 中，而不是 rules。为了使你受益于此，如果没有按照正确方式去做，webpack 会给出警告。* 

### loader特性

### css-loader
>[style-loader](https://doc.webpack-china.org/loaders/style-loader) Adds CSS to the DOM by injecting a style tag
> [css-loader](https://github.com/webpack-contrib/css-loader)

`npm install css-loader -D`

`npm install style-loader -D`  //style-loader 会将css样式内联到html中

```js
config.module = {
   rules: [
    {test: '/\.css$/', use: ['style-loader', 'css-loader']}
   ]
}
```
### css-module
>[CSS Modules实践](https://segmentfault.com/a/1190000010301977)
通过webpack对每个css文件（模块）中的选择器名称名进行一定扩展保证其唯一性，当通过css-loader解析时后require('xx.css')后的模块会返回把原始的选择器名和扩展后的名字映射的对象。

## resolove
resolver 是一个库(library)，用于帮助找到模块的绝对路径。一个模块可以作为另一个模块的依赖模块，然后被后者引用，如下：
* `resolve.modules：[]` 未指定模块路径时，会从此选项中搜索。默认为`node_modules`;
* `resolve.alias: {}` 设置模块别名
>http://www.css88.com/doc/webpack2/configuration/resolve/#resolveloader

### resolve.mainFields

## plugins

### htmlWebpackPlugin
[文档](https://github.com/jantimon/html-webpack-plugin#plugins)
[默认模板](https://github.com/jaketrent/html-webpack-template/blob/86f285d5c790a6c15263f5cc50fd666d51f974fd/index.html)

`npm install -D html-webpack-plugin`

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

### 清理 /dist 文件夹

[clean-webpack-plugin ](https://www.npmjs.com/package/clean-webpack-plugin)

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
## dev-server、webpack-dev-middleware

`npm install webpack-dev-server --save-dev`

`webpack-dev-server --open --config webpack.config`

命令行默认打开项目目录下的webpack.config.js文件，如果不是则需使用--config指定具体文件

>webpack-dev-server是一个小型的node.js Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。它还有一个通过Socket.IO连接着webpack-dev-server服务器的小型运行时程序。webpack-dev-server发送关于编译状态的消息到客户端，客户端根据消息作出响应。

## 构建目标（target）

```
{
target: 'node',//node、web...
}
```
*构建应用可以在客户端和服务端运行，在不同的环境运行，webpack的构建会有一些不同。（待完善）*

## 模块热替换(Hot Module Replacement)
[模块热替换](https://doc.webpack-china.org/concepts/hot-module-replacement)(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：


>指南：https://doc.webpack-china.org/guides/hot-module-replacement

>指南：https://www.jianshu.com/p/941bfaf13be1

### 启用 HMR

``` 
devSever {
    hot: true,
},
plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
]
```

注意：要使HMR功能生效，还需要做一件事情，就是要在应用热替换的模块或者根模块里面加入允许热替换的代码。否则，热替换不会生效，还是会重刷整个页面。
```
if(module.hot) module.hot.accept();
```
也可以使用一些插件去完成这个工作，例如webpack-module-hot-accept插件。不过，webpack-dev-server HMR结合react-hot-loader使用的时候，react-hot-loader会去做这个工作。

> 如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。

### loader


## 代码分离(code split)
代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

### 分离manifes和runtime
过使用 bundle 计算出内容散列(content hash)作为文件名称，这样在内容或文件修改时，浏览器中将通过新的内容散列指向新的文件，从而使缓存无效。一旦你开始这样做，你会立即注意到一些有趣的行为。即使表面上某些内容没有修改，计算出的哈希还是会改变。这是因为，runtime 和 manifest 的注入在每次构建都会发生变化。

### 提取公共js模块
利用`CommonsChunkPlugin`将多个入口的公共代码分离出来
[CommonsChunkPlugin](https://doc.webpack-china.org/plugins/commons-chunk-plugin/#-minchunks-)
options:
* name和names：chunk的名称，如果这个chunk已经在entry中定义，该chunk会被直接提取；如果没有定义，则生成一个空的chunk来提取其他所有chunk的公共代码。
* filename：可以指定提取出的公共代码的文件名称，可以使用output配置项中文件名的占位符。未定义时使用name作为文件名。
* chunks：可以指定要提取公共模块的源chunks，指定的chunk必须是公共chunk的子模块，如果没有指定则使用所有entry中定义的入口chunk。
* minChunks：在一个模块被提取到公共chunk之前，它必须被最少minChunks个chunk所包含。（通俗的说就是一个模块至少要被minChunks个模块所引用，才能被提取到公共模块。）
    该数字必须不小于2或者不大于chunks的个数。默认值等于chunks的个数。
    如果指定了Infinity，则创建一个公共chunk，但是不包含任何模块，内部是一些webpack生成的runtime代码和chunk自身包含的模块（如果chunk存在的话）。
    用户也可以定制自己的逻辑去生成代码。

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

*注意：生成的common chunks 需要首先引入到html中，不然会报错。*

```js
  module.exports = {
      entry: {
          app: ‘./src/index.js‘,
          vender: [
              ‘lodash‘,
              ‘otherlib‘
          ]
      },
      plugins: [
         new webpack.optimize.CommonsChunkPlugin({
             name: ‘vender‘
         })
              ],
     output: {
         filename: ‘[name].[chunkhash].js‘,     // 使用Hash来命名文件，实现文件缓存的功能。当文件内容发生变化，文件名会随之改变。
         path: path.resolve(__dirname, ‘dist‘)
     }
 };
```

上面的代码中定义了两个入口，app和vender（公共库），plugins中使用CommonsChunkPlugin提取vende
vender是我们提取出来的公共chunk，通常不会被修改，所以理应在每次编译后文件名保持一致。然而，我们尝试修改入口文件index.js会发现，vender的文件名会发生变化。

原因呢上面提到过，由于每次编译会导致vender的module.id发生变化，内部的runtime代码随之发生改变。

解决方案有以下几种：
　　1. 使用NamedModulesPlugin插件，用文件路径而非默认的数字ID来作为模块标识。
　　2. 使用HashedModuleIdsPlugin插件，用相对路径的Hash值来作为模块标识。推荐在生产环境中使用。
　　3. 将runtime部分的代码提取到一个单独的文件中，代码如下。
```js
 module.exports = {
      entry: {
          app: ‘./src/index.js‘,
          vender: [
              ‘lodash‘
          ]
      },
      plugins: [
          new webpack.optimize.CommonsChunkPlugin({
             name: ‘vender‘,
             minChunks: Infinity
         }),
         new webpack.optimize.CommonsChunkPlugin({
             name: ‘manifest‘,
             chunks: [‘vender‘]
         })
     ],
     output: {
         filename: ‘[name].[chunkhash].js‘,
         path: path.resolve(__dirname, ‘dist‘)
     }
 };

```
代码中再次使用了CommonsChunkPlugin，从vender中提取出了名为manifest的运行时代码。

提取node-module中的模块为公共库

```
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',//vendor为一个新的chunk
      minChunks: function (module, count) {
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
      chunks: ['vendor']
    }),
```

### 提取css模块
[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/master/README.md)
它会将所有的 入口chunk (entry chunks) 中的 require("style.css") 移动到分开的 css 文件

`npm install --save-dev extract-text-webpack-plugin`

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),//生成的文件名， 多入口应设为[name].[id].[contenthash].css
  ]
}
```
* 警告: ExtractTextPlugin 对 每个入口 chunk 都生成对应的一个文件, 所以当你配置多个入口 chunk 的时候，生成的文件名你必须使用 [name], [id] or [contenthash]

*webpack4.0使用[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)来专门提取css*

### 打包分离公共库及缓存
```
var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'], // 指定公共 bundle 的名字。
                minChunks: function (module) {
                   // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
        ]
    }
};
```

### v4.0
CommonsChunkPlugin 已经从 webpack v4（代号 legato）中移除
此插件实现的功能通过optimization选项进行配置

```
  //提取公共代码库
  optimization: {
      splitChunks: {
      chunks: 'all'
    }
  }
```

## tree shaking
## 动态导入
>[文档](https://doc.webpack-china.org/guides/code-splitting/#-prevent-duplication-)
```js
    var a = require('normal-dep');
    if ( module.hot ) {
      require.ensure(['b'], function(require) {
        var c = require('c');
        // Do something special...
      });
    }
```
### import();
### require.ensure();
动态加载的模块会被单独打包，而且 webpack.optimize.CommonsChunkPlugin插件不会抽取与其他chuanks公共的代码！

## 动态加载和公共代码分离
公共代码抽离好处是多个入口文件的情况下，每个chunk中可能包含了大量的重复代码或模块，造成代码体积过大，还有浪费浏览器加载资源，在多页应用下，更无法缓存公共文件。
动态延时加载，可以在代码执行时根据具体情况进行加载，按需加载的模块如果在入口chunk中未引用则代码会被单独打包。这样避免了一次性打包所有代码造成打包文件过大的问题。 同时存在一个或多个模块同时被同步和按需加载模块依赖，造成代码重复打包的问题。

## shim
> [shim](https://webpack.docschina.org/guides/shimming/)

### 全局变量

```
 plugins: [
   new webpack.ProvidePlugin({
     _: 'lodash'
   })
 ]
```
### 全局 exports
我们可以使用 exports-loader，将一个全局变量作为一个普通的模块来导出

### 加载 polyfills

## 构建性能(https://webpack.docschina.org/guides/build-performance/#development)

### vue相关
vue-template-compiler 配合vue-loader
### babel
>[如何使用babel](https://segmentfault.com/a/1190000014167121)
## 打包分析工具
`[webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer)`
可生成分析图