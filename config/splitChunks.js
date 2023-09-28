/**
 * 代码分割
 */
const splitChunks = {
  chunks: 'all',
  cacheGroups: {
    vendors: {
      name: 'chunk-vendors',
      test: /[\\/]node_modules[\\/]/,
      chunks: 'initial',
      priority: 1,
      enforce: true,
    },
    fabric: {
      name: 'chunk-fabric',
      test: /[\\/]node_modules[\\/]fabric[\\/]/,
      chunks: 'initial',
      priority: 2,
      enforce: true,
    },
    echarts: {
      name: 'chunk-echarts',
      test: /[\\/]node_modules[\\/]echarts[\\/]/,
      chunks: 'initial',
      priority: 2,
      enforce: true,
    },
    videoJs: {
      name: 'chunk-videoJs',
      test: /[\\/]node_modules[\\/]video.js[\\/]/,
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
  },
};

module.exports.splitChunks = splitChunks;
