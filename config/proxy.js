const { protocol, host } = require('./host');

/**
 * 开发环境代理
 */
module.exports.proxy = {
  '/mockService/': {
    target: `${protocol}//${host.MOCK}`,
    changeOrigin: true,
    pathRewrite: {
      '^/mockService/': '',
    },
  },
};
