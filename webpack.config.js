var path = require('path');
var webpack = require('webpack');

var autoprefixer = require('autoprefixer');

var constPlugin = new webpack.DefinePlugin({
  '__DEV__': JSON.stringify(JSON.parse(process.env.DEV || 'false'))
});

var commonConfig = {
  output: {
    path: path.join(__dirname, 'dist', 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader'
      ]
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
};

module.exports = Object.assign({}, commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index'
  ],
  plugins: [
    constPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
})
