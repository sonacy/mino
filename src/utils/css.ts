export default {
  scss: `{
    test: /\.less$/,
    include: [
      resolve(__dirname,'../node_modules/antd'),
    ],
    loaders: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          modifyVars: theme,
          javascriptEnabled: true,
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    loaders: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          localIdentName: '[name]_[local]-[hash:base64:7]',
          importLoaders: 2
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [
            require('autoprefixer')(),
          ]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    exclude: /node_modules/,
  },`,
  less: `{
    test: /\.less$/,
    include: [
      resolve(__dirname,'../node_modules/antd'),
    ],
    loaders: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          modifyVars: theme,
          javascriptEnabled: true,
        },
      },
    ],
  },
  {
    test: /\.less$/,
    include: [
      resolve(__dirname, 'src'),
    ],
    loaders: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          localIdentName: '[name]_[local]-[hash:base64:7]',
          importLoaders: 2
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [
            require('autoprefixer')(),
          ]
        }
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    exclude: /node_modules/,
  },`,
  stylus: `{
    test: /\.less$/,
    include: [
      resolve(__dirname,'../node_modules/antd'),
    ],
    loaders: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          modifyVars: theme,
          javascriptEnabled: true,
        },
      },
    ],
  },
  {
    test: /\.styl$/,
    loaders: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          localIdentName: '[name]_[local]-[hash:base64:7]',
          importLoaders: 2
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [
            require('autoprefixer')(),
          ]
        }
      },
      {
        loader: 'stylus-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    exclude: /node_modules/,
  },`,
  nothing: `{
    test: /\.less$/,
    include: [
      resolve(__dirname,'../node_modules/antd'),
    ],
    loaders: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          modifyVars: theme,
          javascriptEnabled: true,
        },
      },
    ],
  },`,
}
