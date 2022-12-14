/**
 * 开发代理
 */
const proxy = () => () => {
  return {
    https: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/v2ex/': {
        target: 'https://www.v2ex.com',
        changeOrigin: true,
        pathRewrite: { '^/v2ex': '/' },
      },
    },
  };
};

module.exports.proxy = proxy;
