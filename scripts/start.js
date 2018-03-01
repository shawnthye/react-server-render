'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const openBrowser = require('react-dev-utils/openBrowser');

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.config.dev');
const compiler = webpack(config);
const PORT = 3000;
const app = express();

app.use(webpackDevMiddleware(compiler, {
  // logLevel: 'silent',
  // publicPath: config.output.publicPath,
  // serverSideRender: true
}));
app.use(webpackHotMiddleware(compiler, {
  log: false,
}));

app.listen(PORT, function () {
  console.log(chalk.cyan('Starting the development server...\n'));
  openBrowser('http://localhost:' + PORT);
});

