import webpack from 'webpack';
import baseConfig from './webpack.config.babel';

const config = Object.create(baseConfig);
config.plugins.push(...[
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    },
    sourceMap: false
  })
]);
config.devtool = 'hidden-sourcemap';

export default config;
