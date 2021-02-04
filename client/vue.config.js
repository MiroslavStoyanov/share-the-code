module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        },
      }
    },
    lintOnSave: "error",
    publicPath: process.env.BASE_URL
  }