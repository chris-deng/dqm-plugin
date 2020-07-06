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
  //  extra: {
  //   extractText: {
  //     allChunks: true,
  //     filename: 'dqm-plugin.css'
  //   },
  //  },
    autoprefixer: {
      remove: false,
    }
  }
}
