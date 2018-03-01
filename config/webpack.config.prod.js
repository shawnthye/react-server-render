const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const LOADABLE_JSON_PATH = path.resolve(__dirname, '.tmp', 'react-loadable.json');
const REACT_LOADABLE_PLUGIN = new (require('react-loadable/webpack').ReactLoadablePlugin)({
  filename: LOADABLE_JSON_PATH
});

const STATIC_SITE_GENERATOR_PLUGIN = new (require('static-site-generator-webpack-plugin'))({
  crawl: true,
  paths: ['/'],
  locals: {
    loadableStats: () => require(LOADABLE_JSON_PATH)
  }
});

const APPLICATION = {
  name: "bundle.js",
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?name=app&path=/__webpack_hmr&reload=true',
    paths.appIndexJs
  ],
  output: {
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: [paths.appSrc],
      },
      {
        oneOf: [
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: [paths.appSrc],
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                require.resolve('react-loadable/babel')
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            },
          },
        ]
      }
    ]
  },
  plugins: [
    REACT_LOADABLE_PLUGIN,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
};

const STATIC = {
  name: 'server.js',
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  target: "node",
  entry: [
  paths.appRenderJs
  ],
  output: {
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: "umd"
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: [paths.appRenderJs, paths.appSrc],
      },
      {
        oneOf: [
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: [paths.appRenderJs, paths.appSrc],
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                require.resolve('react-loadable/babel'),
                require.resolve('babel-plugin-dynamic-import-node'),
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};

module.exports = [
  STATIC,
  APPLICATION
];