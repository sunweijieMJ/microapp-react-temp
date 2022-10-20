const path = require('path');
const { addAfterLoaders, loaderByName } = require('@craco/craco');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const envConfig = require('./config/env');
const { proxy } = require('./config/proxy');
const { splitChunks } = require('./config/splitChunks');

const timeStamp = Date.now();
const resolve = (dir) => path.join(__dirname, '.', dir);

module.exports = {
  // 配置开发环境代理
  devServer: proxy(),
  webpack: {
    // 配置路径别名
    alias: {
      '@': resolve('src'),
    },
    // 自定义webpack配置
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'development') {
        webpackConfig.plugins.push(
          // 注入环境变量
          new webpack.DefinePlugin({
            'process.env.MICRO_APP': JSON.stringify(envConfig.microApps),
          })
        );
      } else {
        // 关闭devtool
        webpackConfig.devtool = false;

        // 修改打包目录名称
        paths.appBuild = 'dist';

        // 修改output
        webpackConfig.output = {
          ...webpackConfig.output,
          // 打包目录
          path: resolve('./dist'),
          // 打包编译文件名称[hash.时间戳]
          filename: `static/js/[name].${timeStamp}.js`,
          chunkFilename: `static/js/[name].${timeStamp}.js`,
        };

        // 代码分割
        webpackConfig.optimization.splitChunks = {
          ...webpackConfig.optimization.splitChunks,
          ...splitChunks,
        };

        webpackConfig.plugins.push(
          // 打包语言包
          new CopyWebpackPlugin({
            patterns: [{ from: './src/locale', to: './locale' }],
          })
        );

        if (process.env.ANALYZER) {
          webpackConfig.plugins.push(
            // 打包产物分析
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: true,
              reportFilename: resolve('analyzer/index.html'),
            })
          );
        }
      }

      // 配置扩展扩展名
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        ...['.scss', '.less'],
      ];

      // 配置全局scss
      addAfterLoaders(webpackConfig, loaderByName('sass-loader'), {
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: ['./src/assets/scss/base.scss'],
        },
      });

      return webpackConfig;
    },
  },
};
