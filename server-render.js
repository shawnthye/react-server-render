import chalk from 'chalk';
import openBrowser from 'react-dev-utils/openBrowser';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import App from './src/components/App';

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>...</head>
      <body>
        <div id="app">${ReactDOMServer.renderToString(<App/>)}</div>
      </body>
    </html>
  `);
});

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(chalk.cyan('Starting the development server...\n'));
    openBrowser('http://localhost:' + PORT);
  });
});


