/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    port: 9000,
    open: true,
    contentBase: baseWebpackConfig.externals.paths.build,
    overlay: true,
    historyApiFallback: true
  },
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
