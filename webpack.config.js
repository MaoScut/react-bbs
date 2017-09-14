const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/', //自动给静态资源路径加上前缀
  },

  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    // historyApiFallback: true, // 把404重定向到index，不能说是重定向，因为url没改变嘛，404会返回index
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: ['babel-loader'],
    }, {
      test: /\.s?css$/,
      loader: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
