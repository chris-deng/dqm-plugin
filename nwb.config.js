module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'DQMPlugin',
      externals: {
        react: 'React'
      }
    }
  },
  devServer: {
    proxy: {
      '/dqm/api': {
        target: 'http://dqm.nie.netease.com:8080',
        pathRewrite: {'^/dqm/api' : ''}
      }
    }
  },
  webpack: {
    aliases: {},
    rules: {
      cssPreprocessors: {
        sass: {
          test: /\.s[ac]ss$/,
          use:['css-loader', 'sass-loader']
        }
      }
    },
    extractCSS: {
      filename: 'dqm-plugin.css'
    },
    autoprefixer: {
      remove: false,
    }
  },
}
