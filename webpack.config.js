const webpack = require('webpack');
const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

process.traceDeprecation = true;
module.exports = function(env) {
  const CONFIG = {
    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ['es2015', {'modules': false}],
            'react'
          ],
          plugins: [
            'transform-object-rest-spread', 'lodash'
          ]
        }
      },  {
        test: /\.s?css$/,
        use: [ 'style-loader',
               {
                 loader:'css-loader',
                 options: {
                   sourceMap: true,
                   importLoaders: 1
                 }
               },
               {
                 loader: 'postcss-loader',
                 options: {
                   sourceMap: 'inline',
                   plugins: () => [
                     require('postcss-import'),
                     require('precss'),
                     require('autoprefixer')({
                       browsers: 'last 2 versions'
                     }),
                   ]
                 }
               }
        ]
      }]
    }
  };

  switch (env) {
    case 'front':
      CONFIG.context= path.resolve(__dirname, './src');
      CONFIG.devServer = {
      //hotOnly: true
        contentBase: path.join(__dirname, './dist'),
        hot: true,
        //publicPath: '/dist/'
      };
      CONFIG.devtool= 'cheap-source-map';
      CONFIG.entry= {
        app: [
          'react-hot-loader/patch',
          './app.js'
        ]
      };
      CONFIG.output= {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
      };
      CONFIG.plugins= [
        new LodashModuleReplacementPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpack({
          filename: 'index.html',
          inject: true,
          template: './index.html'
        })
      ];
      break;
    default:
      console.log('We needz an environment');
      return;
  }
  return CONFIG;
};
