var baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path')
module.exports = merge(baseConfig, {
	mode: 'development',
	//devtool: 'inline-source-map',
    devtool: '#eval-source-map',
	devServer: {
		hot: true,
        publicPath: '/',
        historyApiFallback: true,
        noInfo: true,
        overlay: true
	},
	plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "commons",
    //   // ( 公共chunk(commnons chunk) 的名称)
    //   filename: "commons.js",
    //   // ( 公共chunk 的文件名)
    //   minChunks: 2,
    //   // (模块必须被3个 入口chunk 共享)
    //   chunks: ["main"],
    //   // (只使用这些 入口chunk)
    // }),
    new webpack.NamedModulesPlugin(), //我们还添加了 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
    new webpack.HotModuleReplacementPlugin(),
  ]
})