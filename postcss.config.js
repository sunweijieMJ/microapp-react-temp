module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    autoprefixer: {},
    // 'postcss-px-to-viewport': {
    //   unitToConvert: 'px',
    //   viewportWidth: 1920, // UI设计稿的宽度
    //   viewportHeight: 1080,
    //   unitPrecision: 3, // 精度
    //   propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    //   viewportUnit: 'vw', // 指定需要转换成的视窗单位
    //   fontViewportUnit: 'rem', // 指定字体需要转换成的视窗单位
    //   selectorBlackList: [],
    //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    //   mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
    //   replace: true, // 是否转换后直接更换属性值
    //   include: [/views/],
    //   landscape: false, // 是否处理横屏情况
    // },
  },
};
