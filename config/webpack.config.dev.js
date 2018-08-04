const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { prepareProxy } = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('./paths');


// https://webpack.js.org/configuration/dev-server/
const devServer = {
  hot: true,
  compress: true,
  contentBase: paths.appPublic,
  watchContentBase: true,
  overlay: true,
  proxy: prepareProxy({
    '/api': {
      target: 'http://localhost:8080',
    },
  }, paths.appPublic)
};

module.exports = {
  entry: {
    app: path.join(paths.appSrc, 'index.js'),
  },
  mode: 'development',
  module: {
    rules: [
      // js file
      {
        test: /\.(js|jsx|mjs)$/,
        include: [
          paths.appSrc,
        ],
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
      // css file
      {
        test: /\.css/,
        oneOf: [
          {
            // for app src, with css module
            include: paths.appSrc,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  // css module
                  importLoaders: 1,
                  modules: true,
                  localIdentName: "[local]__[hash:base64:5]",
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
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
            ]
          },
          {
            // for node_modules and other, no css module
            exclude: paths.appSrc,
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
        ],
      },
      // scss file
      {
        test: /\.scss/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              // css module
              importLoaders: 1,
              modules: true,
              localIdentName: "[local]__[hash:base64:5]",
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
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
          {
            loader: require.resolve('sass-loader'),
            options: {

            },
          },
        ],
      },
      // images
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    // generate html
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
  ],
  devServer,
};
