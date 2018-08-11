const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');

module.exports = {
    ...common,
    entry: [
        'react-hot-loader/patch',
        './src/client/index.jsx',
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: false,
        }),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 3001,
        proxy: {
            '/testy': 'http://localhost:3000',
        },
    }
};
