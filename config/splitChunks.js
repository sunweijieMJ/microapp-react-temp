/**
 * 代码分割
 */
const splitChunks = {
  chunks: 'all',
  cacheGroups: {
    layout: {
      name: 'components-layout',
      test: /[\\/]src[\\/]layout[\\/]/,
      chunks: 'initial',
      priority: 1,
      enforce: true,
    },
    vendors: {
      name: 'chunk-vendors',
      test: /[\\/]node_modules[\\/]/,
      chunks: 'initial',
      priority: 1,
      enforce: true,
    },
    echarts: {
      name: 'chunk-echarts',
      test: /[\\/]node_modules[\\/]echarts[\\/]/,
      chunks: 'initial',
      priority: 2,
      enforce: true,
    },
    lodash: {
      name: 'chunk-lodash',
      test: /[\\/]node_modules[\\/]lodash[\\/]/,
      chunks: 'initial',
      priority: 2,
      enforce: true,
    },
    moment: {
      name: 'chunk-moment',
      test: /[\\/]node_modules[\\/]moment[\\/]/,
      chunks: 'initial',
      priority: 2,
      enforce: true,
    },
  },
};

module.exports.splitChunks = splitChunks;
