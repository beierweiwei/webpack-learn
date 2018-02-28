#learn note

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
(CommonsChunkPlugin)[https://doc.webpack-china.org/plugins/commons-chunk-plugin/#-minchunks-]
new webpack.optimize.CommonsChunkPlugin(options)

*注意：生成的common chunks 需要首先引入到html中，不然会报错

#代码分离

#动态导入
https://doc.webpack-china.org/guides/code-splitting/#-prevent-duplication-
```
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