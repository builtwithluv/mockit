const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require('webpack');

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        './src/client/index.jsx',
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: 'pug-loader',
            },
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            inject: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8080,
        proxy: {
            '/mockit': 'http://localhost:3000',
        },
    }
});
