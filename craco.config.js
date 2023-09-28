const path = require('path');
const { addAfterLoaders, loaderByName } = require('@craco/craco');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { devServer } = require('./config/devServer');
const { microAppsEnv } = require('./config/startEnv');
const { splitChunks } = require('./config/splitChunks');

const timeStamp = Date.now();

module.exports = {
  // 配置开发环境代理
  devServer: devServer(),
  webpack: {
    // 配置路径别名
    alias: {
      '@': path.join(__dirname, './src'),
    },
    // 自定义webpack配置
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'development') {
        webpackConfig.plugins.push(
          // 注入环境变量
          new webpack.DefinePlugin({
            'process.env.MICRO_APP': JSON.stringify(microAppsEnv),
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
          path: path.join(__dirname, './dist'),
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
          }),
          // 开启gzip
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg|json)$/,
            threshold: 10240,
            minRatio: 0.8,
          })
        );

        if (process.env.ANALYZER) {
          webpackConfig.plugins.push(
            // 打包产物分析
            new BundleAnalyzerPlugin()
          );
        }
      }

      // 配置loader
      webpackConfig.module.rules.push(
        {
          test: /\.(css|scss|less)$/,
          use: [
            {
              loader: 'postcss-loader',
            },
          ],
        },
        {
          test: /\.worker\.(js|ts)$/,
          use: [
            {
              loader: 'worker-loader',
              options: {
                filename: '[name].js',
              },
            },
            {
              loader: 'babel-loader',
            },
          ],
        }
      );

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
