(function (global) {
  const env = {
    // 环境
    NODE_ENV: 'production',
    // 后端接口地址
    REACT_APP_BaseURL: 'xx.xx.xx.xx',
    // 前端页面地址
    REACT_APP_WebURL: 'xx.xx.xx.xx',
  }

  global.env = env;
})(typeof global !== 'undefined' ? global : window);
