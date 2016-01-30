import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import routes from './src/routes.js';

module.exports = {
  entry: {
    'main': './src/index.js'
  },
  output: {
    filename: 'index.js',
    path: 'dist',
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.js$/
      },
      {
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        test: /\.css$/
      },
      {
        loader: 'html!markdown',
        test: /\.markdown$/,
      }
    ]
  },
  plugins: [
    new StaticSiteGeneratorPlugin('main', Object.keys(routes)),
    new ExtractTextPlugin('styles.css')
  ]
};
