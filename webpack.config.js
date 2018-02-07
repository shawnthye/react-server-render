'use strict';

const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const nodeExternals = require('webpack-node-externals');

const LOADABLE_JSON_PATH = path.resolve(__dirname, '.tmp', 'react-loadable.json');
const REACT_LOADABLE_PLUGIN = new (require('react-loadable/webpack').ReactLoadablePlugin)({
  filename: LOADABLE_JSON_PATH
});

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(``);
const STATIC_SITE_GENERATOR_PLUGIN = new (require('static-site-generator-webpack-plugin'))({
  crawl: false,
  paths: [
    '/',
  ],
  // globals: {
  //   window: {},
  //   document: window.document
  // },
  locals: {
    loadableStats: () => require(LOADABLE_JSON_PATH)
  }
});

module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  // devtool: 'source-map',
  devtool: false,
  target: "node",
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
    // libraryTarget: "umd"
    libraryTarget: "commonjs"
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
            // exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [
                ["env", {
                  "targets": {
                    "node": "current"
                  }
                }],
                'react',

                // require.resolve('babel-preset-react-app')
              ],
              plugins: [
                'transform-class-properties',
                require.resolve('babel-plugin-syntax-dynamic-import'),
                // require.resolve('babel-plugin-dynamic-import-node-sync'),
                // require.resolve('babel-plugin-dynamic-import-node'),
                // require.resolve('babel-plugin-dynamic-import-webpack'),
                // require.resolve('babel-plugin-transform-ensure-ignore'),
                require.resolve('react-loadable/babel'),
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
  resolve: {
    // extensions: ['.js'],
    // alias: {
    //   components: path.resolve(__dirname, '..', 'src/components')
    // }
  },
  externals: {
    ...nodeExternals(),
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
  },
  plugins: [
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.NamedModulesPlugin(),
    REACT_LOADABLE_PLUGIN,
    STATIC_SITE_GENERATOR_PLUGIN,
  ]
};