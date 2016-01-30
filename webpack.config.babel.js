import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import marked from 'marked';
import { highlightAuto } from 'highlight.js';

import routes from './src/routes.js';
marked.setOptions({ highlight: function (code) { return highlightAuto(code).value; } });

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
  markdownLoader: { renderer: new marked.Renderer() },
  plugins: [
    new StaticSiteGeneratorPlugin('main', Object.keys(routes)),
    new ExtractTextPlugin('styles.css')
  ]
};
