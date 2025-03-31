const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//Development Webpack
if (isDev) {

	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const config = require('./webpack.config.dev.js');
	const compiler = webpack(config);

	app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
	}));

	app.use(webpackHotMiddleware(compiler));

}

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Main View
app.use('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//Catch 404
app.use((req, res, next) => {
	next(createError(404));
});

//Error Handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json(isDev ? err : {});
});

module.exports = app;