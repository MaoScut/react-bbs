const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  entry: [
    // 'babel-polyfill',
    'webpack-hot-middleware/client', // 用自己的server要加这一句，启动hmr连接
    // 'react-hot-loader/patch', // 用自己的server就不用这个了
    './src/index.jsx',
    // './src/test/testStorage.jsx',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  // devtool: 'inline-source-map',
  devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //   hot: true,
  //   historyApiFallback: true,
  //   inline: true,
  //   contentBase: './dist',
  // },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'), // default value if not specified
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new webpack.EnvironmentPlugin([
    //   'NODE_ENV',
    // ]),
  ],
};
