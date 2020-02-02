const path = require('path')

module.exports = (env, argv) => {
  return {
    entry: path.resolve(__dirname, 'index.js'),
    devtool: 'source-map',
    output: { filename: 'bundle.js' },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader')
        }
      ]
    },
    plugins: [],
    devServer: {
      stats: 'minimal',
      contentBase: __dirname
    }
  }
}
