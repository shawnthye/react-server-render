const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const LOADABLE_JSON_PATH = path.resolve(__dirname, '.tmp', 'react-loadable.json');
const REACT_LOADABLE_PLUGIN = new (require('react-loadable/webpack').ReactLoadablePlugin)({
  filename: LOADABLE_JSON_PATH
});

const STATIC_SITE_GENERATOR_PLUGIN = new (require('static-site-generator-webpack-plugin'))({
  crawl: false,
  paths: [
    '/',
  ],
  locals: {
    loadableStats: () => require(LOADABLE_JSON_PATH)
  }
});

module.exports = [
  {
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    // devtool: 'source-map',
    devtool: false,
    // entry: {
    //   index: [
    //     // 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    //     paths.appIndexJs
    //   ],
    //   browser: './src/browser.js'
    // },
    entry: [
      paths.appIndexJs
    ],
    output: {
      pathinfo: true,
      path: path.resolve(__dirname, 'build'),
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
          include: [paths.appRenderJs, paths.appSrc],
        },
        {
          oneOf: [
            // Process JS with Babel.
            {
              test: /\.(js|jsx|mjs)$/,
              include: [paths.appSrc, paths.appRenderJs],
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                presets: [
                  'env',
                  require.resolve('babel-preset-react-app')
                ],
                plugins: [
                  require.resolve('react-loadable/babel'),
                  // require.resolve('loadable-components/babel'),
                  // 'transform-class-properties',
                  // require.resolve('babel-plugin-syntax-dynamic-import'),
                  // require.resolve('babel-plugin-dynamic-import-node-sync'),
                  // require.resolve('babel-plugin-dynamic-import-node'),
                  // require.resolve('babel-plugin-dynamic-import-webpack'),
                  // require.resolve('babel-plugin-transform-ensure-ignore'),
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                // cacheDirectory: true,
              },
            },
          ]
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new webpack.NamedModulesPlugin(),
      REACT_LOADABLE_PLUGIN,
    ]
  },
  {
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    // devtool: 'source-map',
    devtool: false,
    target: "node",
    entry: [
      paths.appRenderJs
    ],
    output: {
      pathinfo: true,
      path: path.resolve(__dirname, 'build'),
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: 'static/js/server.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: '/',
      // libraryTarget: "umd"
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
              include: [paths.appSrc, paths.appRenderJs],
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                presets: [
                  'env',
                  require.resolve('babel-preset-react-app')
                ],
                plugins: [
                  require.resolve('react-loadable/babel'),
                  require.resolve('babel-plugin-dynamic-import-node'),
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                // cacheDirectory: true,
              },
            },
          ]
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new webpack.NamedModulesPlugin(),
      REACT_LOADABLE_PLUGIN,
      STATIC_SITE_GENERATOR_PLUGIN,
    ]
  }];