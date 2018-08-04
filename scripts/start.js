const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const webpackDevConfig = require('../config/webpack.config.dev');

const compiler = Webpack(webpackDevConfig);
const serverConfig = {
  ...webpackDevConfig.devServer,
};

const devServer = new WebpackDevServer(compiler, serverConfig);
// Launch WebpackDevServer.
devServer.listen(3000, 'localhost', err => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.cyan('Starting the development server...\n'));
  openBrowser('http://localhost:3000');
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
