const path = require('path');
const fs = require('fs-extra');
const Webpack = require('webpack');
const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const paths = require('../config/paths');
const webpackProdConfig = require('../config/webpack.config.prod');

const compiler = Webpack(webpackProdConfig);

console.log('Creating an optimized production build...');

function build() {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      return resolve({
        stats,
        warnings: messages.warnings,
      });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

// copy public files
copyPublicFolder();

// build
build().then(({ stats, warnings }) => {
  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(warnings.join('\n\n'));
    console.log(
      '\nSearch for the ' +
      chalk.underline(chalk.yellow('keywords')) +
      ' to learn more about each warning.'
    );
    console.log(
      'To ignore, add ' +
      chalk.cyan('// eslint-disable-next-line') +
      ' to the line before.\n'
    );
  } else {
    console.log(chalk.green('Compiled successfully.\n'));
  }
});

