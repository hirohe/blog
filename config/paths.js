const path = require('path');

const appPath = path.resolve(__dirname, '../');

const resolveApp = relative => path.resolve(appPath, relative);

const appSrc = resolveApp('src');
const appPublic = resolveApp('public');
const appHtml = resolveApp('public/index.html');
const appBuild = resolveApp('dist');

module.exports = {
  appSrc,
  appPublic,
  appHtml,
  appBuild,
};
