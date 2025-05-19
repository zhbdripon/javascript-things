const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',       // Entry point
  output: {
    filename: 'bundle.js',       // Output file
    path: path.resolve(__dirname, 'dist'),
    clean: true                  // Clean old files
  },
  module: {
    rules: [
      {
        test: /\.js$/,           // For JavaScript files
        exclude: /node_modules/,
        use: 'babel-loader'      // Use Babel (if you're using ES6+ or React)
      },
      {
        test: /\.css$/,          // For CSS files
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'  // 👈 use this file as base
    })
  ],
  devServer: {
    static: './dist',            // Serve content from /dist
    port: 3000,
    open: true
  },
  mode: 'development'            // Change to 'production' for production build
};
