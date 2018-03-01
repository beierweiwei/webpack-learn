#learn note
##概念
chunk：每一个单独打包的文件可以成为chunk
入口chunk: 被打包后页面需要引入的包，相当于一个顶层依赖


##webpack.config配置项
### entry
入口文件。
类型：string（简易写法）, array(多入口打包成单个文件), object（多入口分别打包）

```js

```
### output
output: {
  filename: '',
  chunkname: '', //决定非入口文件的名称
}


### loader

### plugins
[CommonsChunkPlugin](https://doc.webpack-china.org/plugins/commons-chunk-plugin/#-minchunks-)

`new webpack.optimize.CommonsChunkPlugin(options)`
```js
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
es2015 import();

require.ensure();
动态加载的模块会被单独打包，而且 webpack.optimize.CommonsChunkPlugin插件不会抽取与其他chuanks公共的代码！
##公共代码分离
利用`CommonsChunkPlugin`将多个入口的公共代码分离出来
##动态加载和公共代码分离
公共代码抽离好处是多个入口文件的情况下，每个chunk中可能包含了大量的重复代码或模块，造成代码体积过大，还有浪费浏览器加载资源，在多页应用下，更无法缓存公共文件。
动态延时加载，可以在代码执行时根据具体情况进行加载，按需加载的模块如果在入口chunk中未引用则代码会被单独打包。这样避免了一次性打包所有代码造成打包文件过大的问题。 同时存在一个或多个模块同时被同步和按需加载模块依赖，造成代码重复打包的问题。
