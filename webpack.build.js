const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const packageJSON = require('./package.json');
const packageJSONStringify = JSON.stringify(packageJSON);
const path = require('path');
const version = packageJSONStringify.version;
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: path.resolve(__dirname, 'src/js/index.tsx'),

	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},

	mode: 'production',

	module: {
		rules: [
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

	performance: {
		hints: false
	},

	plugins: [
		new webpack.DefinePlugin({
			VERSION: version
		}),
		new htmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.build.html')
		}),
		new copyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/images/png/favicon.png')
				},
				{
					from: path.resolve(__dirname, 'src/js/globals.js')
				}
			]
		})
	],

	resolve: {
		extensions: [ '.ts', '.tsx', '.js' ]
	}
};
