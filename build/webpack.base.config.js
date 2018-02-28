var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: ['./src/vender/index.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  // loader: {
  //
  // },
  plugins: [
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
  ]
}