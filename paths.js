'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const PROJECT_DIRECTORY = fs.realpathSync(process.cwd());
const APP_DIRECTORY = path.resolve('.');

const resolveProject = relativePath => path.resolve(PROJECT_DIRECTORY, relativePath);
const resolveApp = relativePath => path.resolve(APP_DIRECTORY, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

// const getPublicUrl = appPackageJson =>
//     envPublicUrl || require(appPackageJson);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
// function getServedPath(appPackageJson) {
//     const publicUrl = getPublicUrl(appPackageJson);
//     const servedUrl =
//         envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
//     return ensureSlash(servedUrl, true);
// }

// config after eject: we're in ./config/
module.exports = {
    dotenv: resolveApp('.env'),
    packages: resolveProject('packages'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appRenderJs: resolveApp('render.js'),
    appNodeModules: resolveApp('node_modules'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    yarnLockFile: resolveProject('yarn.lock'),
    testsSetup: resolveApp('src/setupTests.js'),
    // publicUrl: getPublicUrl(resolveApp('package.json')),
    projectNodeModules: resolveProject('node_modules'),
    // servedPath: getServedPath(resolveApp('package.json'))
};
