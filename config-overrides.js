// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { override, addWebpackAlias } = require('customize-cra');

const resolve = (dir) => path.join(__dirname, '.', dir);

module.exports = override(
  addWebpackAlias({
    '@': resolve('src'),
  })
);
