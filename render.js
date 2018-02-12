import React, {Fragment} from 'react';
import chalk from 'chalk'
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';
import {StaticRouter} from 'react-router-dom'
import App from './src/App';

const error = chalk.bold.red;
// noinspection JSUnusedGlobalSymbols
export default (locals) => {
  const context = {};
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
    console.error(error("app"), error(app));
    // const assets = locals.assets;
    // const scripts = Object.keys(locals.assets).filter(key => assets[key].match(/\.js$/))
    // .map((key) => assets[key]);

    const chunks = getBundles(locals.loadableStats(), modules)
    .filter(chunk => chunk.file.endsWith('.js'))
    .map((chunk) => `/${chunk.file}`);

    const markup = (
        <html>
        <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root" dangerouslySetInnerHTML={{__html: app}}>
        </div>
        <script src={"static/js/bundle.js"}/>
        {chunks.map((js, index) => <script key={index} src={js}/>)}
        </body>
        </html>
    );
    return `<!DOCTYPE html>${renderToStaticMarkup(markup)}`;
  }).catch(err => {
    console.error(error("Loadable"), error(err));
    return "Loadable: " + err
  });
}

