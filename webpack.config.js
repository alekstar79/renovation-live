const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
  // 'index-pre': './index-pre.js',
  // 'admin-pre': './admin-pre.js',
    'index': './index.js',
    'admin': './admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  devServer: {
    hot: true,
    allowedHosts: ['all'],
    static: {
      directory: './dist',
      watch: true
    }
  }
}
