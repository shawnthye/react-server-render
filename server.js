const chalk = require('chalk');
const openBrowser = require('react-dev-utils/openBrowser');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);
const express = require('express');
const app = express();
const React = require('react');
const PORT = 3000;


app.use(webpackDevMiddleware(compiler, {
  // logLevel: 'silent',
  // publicPath: config.output.publicPath,
  serverSideRender: true
}));
// app.use(webpackHotMiddleware(compiler, {
//   log: false,
// }));


app.listen(PORT, function() {
  console.log(chalk.cyan('Starting the development server...\n'));
  openBrowser('http://localhost:' + PORT);
});

