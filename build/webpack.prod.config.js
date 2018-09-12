const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(baseConfig, {
	//mode: 'production',
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.less$/,
	// 			use: ExtractTextPlugin.extract({
	// 				fallback: 'style-loader', //loader(e.g 'style-loader') that should be used when the CSS is not extracted (i.e. in an additional chunk when allChunks: false)
	// 				use: ['css-loader', 'less-loader']
	// 			})
	// 		},
	// 		{
	// 			test: /\.css$/,
	// 			use: ExtractTextPlugin.extract({
	// 				fallback: 'style-loader',
	// 				use: ['css-loader']
	// 			})
	// 		}
	// 	]
	// },
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.DefinePlugin({
			//定义项目环境
      'process.env.NODE_ENV': JSON.stringify('production')
    })
	]
})