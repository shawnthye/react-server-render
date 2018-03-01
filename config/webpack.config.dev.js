const autoprefixer = require('autoprefixer');
const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const REACT_LOADABLE_PLUGIN = new (require('react-loadable/webpack').ReactLoadablePlugin)({
  filename: paths.loadableJson
});

const STATIC_SITE_GENERATOR_PLUGIN = new (require('static-site-generator-webpack-plugin'))({
  crawl: true,
  paths: ['/'],
  locals: {
    loadableStats: () => require(paths.loadableJson)
  }
});

const publicPath = '/';

const APPLICATION = {
  name: "bundle.js",
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('./polyfills'),
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
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
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
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
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
  target: "node",
  entry: [
    paths.appRenderJs
  ],
  output: {
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/server.js',
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
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                }
              ]
            })
          },
        ]
      }
    ]
  },
  plugins: [
    STATIC_SITE_GENERATOR_PLUGIN,
    new ExtractTextPlugin({filename: '[name].css'}),
    new webpack.NamedModulesPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};

module.exports = [
  STATIC,
  APPLICATION
];