import chalk from 'chalk';
import pretty from 'pretty';
import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';
import {StaticRouter} from 'react-router-dom'
import App from './src/App';

const context = {};
const error = chalk.bold.red;
// noinspection JSUnusedGlobalSymbols
export default (locals) => {

  const modules = [];
  const Application = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter location={locals.path} context={context}>
          <App/>
        </StaticRouter>
      </Loadable.Capture>
  );

  return Loadable.preloadAll().then(() => {
    const app = renderToString(Application);
    const chunks = getBundles(locals.loadableStats(), modules)
    .filter(chunk => chunk.file.endsWith('.js'))
    .map((chunk) => `/${chunk.file}`);

    const markup = (
        <html>
        <head>
        </head>
        <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" dangerouslySetInnerHTML={{__html: app}}>
        </div>
        <script src={"/static/js/bundle.js"}/>
        {chunks.map((js, index) => <script key={index} src={js}/>)}
        </body>
        </html>
    );
    return pretty(`<!DOCTYPE html>${renderToStaticMarkup(markup)}`);
  }).catch(err => {
    console.error(error("Loadable"), error(err));
    return "Loadable[ERROR]: " + err
  });
}

