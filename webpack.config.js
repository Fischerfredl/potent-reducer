const WebpackBar = require('webpackbar')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = (env, argv) => {
  const isEnvProduction = argv.mode === 'production'

  return {
    devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
    module: {
      rules: [
        // process javascript with babel
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader')
        }
      ]
    },
    plugins: [
      new WebpackBar(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      })
    ],
    devServer: {
      stats: 'minimal'
    }
  }
}
