const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
  override,
  addWebpackAlias,
  addWebpackResolve,
  overrideDevServer,
  adjustStyleLoaders,
  addWebpackPlugin,
} = require('customize-cra');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const envConfig = require('./config/env');
const { proxy } = require('./config/proxy');

const timeStamp = Date.now();
const isDev = process.env.NODE_ENV === 'development';
const resolve = (dir) => path.join(__dirname, '.', dir);

module.exports = {
  paths(paths) {
    // 修改打包目录名称
    paths.appBuild = resolve('./dist');
    return paths;
  },
  webpack: override(
    // 导入文件的时候可以不用添加文件的后缀名
    addWebpackResolve({
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    }),
    // 配置路径别名
    addWebpackAlias({
      '@': resolve('src'),
    }),
    addWebpackPlugin(
      // 注入环境变量
      new webpack.DefinePlugin({
        'process.env.MICRO_APP': JSON.stringify(envConfig.microApps),
      })
    ),
    // scss设置全局变量、函数
    adjustStyleLoaders((rule) => {
      if (rule.test.toString().includes('scss')) {
        rule.use.push({
          loader: require.resolve('sass-resources-loader'),
          options: {
            resources: ['./src/assets/scss/base.scss'],
          },
        });
      }
    }),
    // 自定义配置
    (config) => {
      if (isDev) {
        config.devtool = 'source-map';
      } else {
        // 打包多语言资源
        config.plugins.push(
          new CopyWebpackPlugin({
            patterns: [{ from: './src/locale', to: './locale' }],
          })
        );

        // 分析依赖包
        if (process.env.ANALYZER) {
          config.plugins.push(new BundleAnalyzerPlugin());
        }

        // 代码分割
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            layout: {
              name: 'layout',
              test: /[\\/]src[\\/]layout[\\/]/,
              chunks: 'initial',
              priority: 1,
              enforce: true,
            },
          },
        };

        // 打包编译文件名称[hash.时间戳]
        config.output.filename = `static/js/[name].t${timeStamp}.js`;
        config.output.chunkFilename = `static/js/[name].t${timeStamp}.js`;
      }

      return config;
    }
  ),
  // 配置开发环境代理
  devServer: overrideDevServer(proxy()),
};
