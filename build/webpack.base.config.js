var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
//var webpackModuleHotAccept = require('webpack-module-hot-accept');
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: ['./src/vender/index.js']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js', //非入口chunk命名
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    hot: true,
  },
  // node: {
  //   fs: 'empty'
  // },
  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader','css-loader']},//注意loader顺序从右至左
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'webpack-module-hot-accept' // add this last,实现HMR
        ]
      }
    ]
  },
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
    }),
    new htmlWebpackPlugin({
      title: 'learn webpack',
      template: './src/home.html'
    }),
    new webpack.NamedModulesPlugin(), //我们还添加了 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
    new webpack.HotModuleReplacementPlugin(),
  ],

}