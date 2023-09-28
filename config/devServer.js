const { isHttps } = require('./host');
const { proxy } = require('./proxy');

/**
 * 开发代理
 */
const devServer = () => {
  return {
    // 解决history路由404问题
    historyApiFallback: true,
    https: isHttps,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    client: {
      // 忽略编译warnings
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    proxy,
  };
};

module.exports.devServer = devServer;
