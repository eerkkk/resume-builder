const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const packageJSON = require('./package.json');
const packageJSONStringify = JSON.stringify(packageJSON);
const path = require('path');
const webpack = require('webpack');
const version = packageJSONStringify.version;

module.exports = {
	devServer: {
		historyApiFallback: true,
		host: '0.0.0.0',
		port: 9000
	},

	devtool: 'source-map',

	entry: path.resolve(__dirname, 'src/js/index.tsx'),
	output: {
		filename: '[name].[hash].js',
		publicPath: '/'
	},

	mode: 'development',

	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				enforce: 'pre',
				loader: 'tslint-loader',
				options: {
					configFile: './tslint.json',
					emitErrors: false,
					tsConfigFile: './src/tsconfig.json',
					typeCheck: true
				}
			},
			{
				test: /\.(scss|css)$/,
				loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				loader: 'file-loader?name=[name].[ext]',
				test: /\.(ttf|woff|woff2|eot|png|jpg|svg)$/
			},
			{
				test: /\.tsx?$/,
				loaders: [ 'ts-loader' ],
				exclude: /node_modules/
			}
		]
	},

	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},

	plugins: [
		new webpack.DefinePlugin({
			DEVELOPMENT: true,
			VERSION: version
		}),
		new htmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.development.html')
		}),
		new copyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/images/png/favicon.png')
				},
				{
					from: path.resolve(__dirname, 'src/js/globals.development.js')
				}
			]
		})
	],

	resolve: {
		extensions: [ '.ts', '.tsx', '.js' ]
	}
};
