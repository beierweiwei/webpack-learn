var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

console.log('process.env.NODE_ENV' ,process.env.NODE_ENV)
const devMode = process.env.NODE_ENV !== 'production'
//var webpackModuleHotAccept = require('webpack-module-hot-accept');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
	entry: {
		main: './src/app.js',
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js', //非入口chunk命名
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/, 
				use: [
					//devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					//devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { 
					loader: 'babel-loader',
					// options: {
					// 	presets: [
					// 		['env', {
					// 			targets: {
					// 				browsers: ['> 1%', 'last 2 versions']
					// 			}
					// 		}]
					// 	]
					// }
				}
			},
			{
				test: /\.(jpg|png|svg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192
					}
				}]
			},
			{
				test: /\.(woff|woff2|eot|ttr|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			title: 'learn webpack',
			// template: path.resolve(__dirname, '../src/home.html')
		}),
		new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				},
				// styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
			}
		},
		runtimeChunk: 'single',
	}

}