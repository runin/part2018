const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
    lottery: path.resolve(__dirname, 'src/js/lottery.js'),
    answer: path.resolve(__dirname, 'src/js/answer.js'),
    vote: path.resolve(__dirname, 'src/js/vote.js')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      hash: true,
      favicon: './src/images/logo.png',
      showErrors: true,
      inject: 'body',
      excludeChunks: ['answer', 'lottery', 'vote']
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/lottery.html',
      filename: 'lottery.html',
      hash: true,
      favicon: './src/images/logo.png',
      showErrors: true,
      inject: 'body',
      excludeChunks: ['index', 'answer', 'vote'],
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/answer.html',
      filename: 'answer.html',
      hash: true,
      favicon: './src/images/logo.png',
      showErrors: true,
      inject: 'body',
      excludeChunks: ['index', 'lottery', 'vote'],
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/vote.html',
      filename: 'vote.html',
      hash: true,
      favicon: './src/images/logo.png',
      showErrors: true,
      inject: 'body',
      excludeChunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/safe.html',
      filename: 'safe.html',
      hash: true,
      favicon: './src/images/logo.png',
      showErrors: true,
      inject: 'body',
      excludeChunks: ['index', 'lottery', 'answer', 'vote'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/static'),
        to: 'static'
      }
    ]),
    new ExtractTextPlugin('css/[name].[contenthash:6].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons', // 这公共代码的chunk名为'commons'
      filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
      minChunks: 3, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
    })
  ],
  output: {
    filename: 'js/[name].[chunkhash:6].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader:'css-loader'/*,
              options: {
                modules: true, //设置css局部作用域
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }*/
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js'
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ],
          publicPath: '../' //生成的独立CSS文件中的url图片地址的publicPath,通常JS中的publicPath不一样,如果一样可以不设置
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: '[name]-[hash].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              }/*,ios bug
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }*/
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [ "es2015" ]
          }
        }
      }
    ]
  }
};