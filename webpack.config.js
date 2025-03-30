const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: [
		'webpack-hot-middleware/client?reload=true',
		'./js/main.jsx',
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader',
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};