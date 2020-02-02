module.exports = api => {
  // caching the babel config
  api.cache.using(() => process.env.NODE_ENV)
  return {
    presets: [require.resolve('@babel/preset-react')]
  }
}
