import React from 'react';
import {renderToString} from 'react-dom/server';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';
import App from './src/components/App';

// noinspection JSUnusedGlobalSymbols
export default async ({assets, loadableStats}) => { // eslint-disable-line
  // const context = {};
  const modules = [];

  const app = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <App/>
      </Loadable.Capture>
  );

  return await Loadable.preloadAll().then(() => {
    const string = renderToString(app);

    const bundles = getBundles(loadableStats(), modules); // eslint-disable-line
    console.log("module", modules);
    console.log("bundles", bundles);
    return `<!DOCTYPE html>
    <html>
    <body>
    ${string}
    </body>
    </html>
    `;
  });
}

// const modules = [];
// const assets = locals.assets;
// const app =
//     <Loadable.Capture report={moduleName => modules.push(moduleName)}>
//       {/*<StaticRouter location={locals.path} context={context}>*/}
//       <App/>
//       {/*</StaticRouter>*/}
//     </Loadable.Capture>;
// const APP = renderToString(app);
//
// // const bundles = getBundles(locals.loadableStats(), modules);
//
// const scripts = Object.keys(locals.assets).filter(key => assets[key].match(/\.js$/))
//     .map((key) => assets[key]);
// // const bundleJs = bundles.filter(bundle => bundle.file.endsWith('.js'))
// //     .map((bundle) => `/${bundle.file}`);
//
//
// const HTML = `
//     <html lang="en">
//     <head>
//       <link rel="stylesheet"
//             href="//fonts.googleapis.com/css?family=Roboto+Mono:400,500|Roboto:400,500|Material+Icons"/>
//       <title>Server render</title>
//       <meta charSet="UTF-8"/>
//       <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//     </head>
//     <body>
//     <div id="root">
//       ${APP}
//     </div>
//     </body>
//     </html>
// `;
//     // ${scripts.map((script) => `<script src="${script}"></script>`)}
//     // ${bundleJs.map((js) => `<script src="${js}"></script>`)}
//
// // require("../static/js/0.chunk.js");
// // const content = locals.webpackStats.compilation.assets['static/js/0.chunk.js'].source();
// console.log("---------------LOGGER START---------------");
// // console.log("APP", content);
// console.log("scripts", scripts);
// // console.log("modules", modules);
// // console.log("bundles", bundles);
// // console.log("bundleJS", bundleJs);
// console.log("\n-------------LOGGER ENDED---------------\n");
//
//
// // await require.ensure(['./static/js/0.chunk.js'], function(require) {
// //   console.log(require)
// //
// //   // Do something special...
// // });
//
// // await Loadable.preloadAll().then(console.log("preload:ready"))
// //     .catch(err => {
// //       console.log("catch:preloadAll", err);
// //     });
// // Loadable.preloadAll().then(console.log("Loadable.preloadAll()", "then()"))
// //     .then(callback(null, APP));
// // Promise.all(Loadable.preloadAll());
// // await Loadable.preloadAll()
// //     .catch(err => {
// //       console.log("catch", err);
// //     });
//
// return Promise.resolve()
//     // .then(Loadable.preloadAll().then(console.log("preload:ready"))
//     //     .catch(err => {
//     //       console.log("catch", err);
//     //     }))
//     // .catch(err => {
//     //   console.log(err);
//     // })
//     .then(() => HTML)
//     .catch(err => {
//       console.log("catch", err);
//     });