const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
console.log('process.env.NODE_ENV' ,process.env.NODE_ENV)
const devMode = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const rootDir = path.resolve(__dirname, '../')

const resolve = relativePath => path.resolve(rootDir, relativePath)
const srcPath = resolve('src')

module.exports = {
	entry: {
		main: './src/main.js',
	},
	output: {
		filename: devMode ? '[name].js' : '[name][hash].js',
		chunkFilename: devMode ? '[name].js' : '[name][hash].js', //非入口chunk命名
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/, 
				use: [
					devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.vue$/,
				use: [{
					loader: 'vue-loader'
				}]
			},
			{
				test: /\.js$/,
				// include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
			  exclude: file => (
  				/node_modules/.test(file) && !/\.vue\.js/.test(file)
				),
				use: { 
					loader: 'babel-loader',
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
				test: /\.(woff|woff2|eot|ttr|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		],
		// noParse: function (context) {
		// 	return /(vue|vuex|vue-router|vuex-router-sync)$/.test(context)
		// }
	},
	plugins: [
		new htmlWebpackPlugin({
			title: 'learn webpack',
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html')
		}),
		new VueLoaderPlugin(),
   	// new webpack.LoaderOptionsPlugin({
    //      // test: /\.xxx$/, // may apply this only for some modules
    //    options: {
    //      noParse: …
    //    }
   	// })
	],
	resolve: {
		extensions: ['*', '.vue', '.js', '.json'],
		alias: {
			'@': path.resolve(rootDir, 'src'),
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				},
				styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
			}
		},
		runtimeChunk: 'single',
	}
}