const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
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
            '/mockit': 'http://localhost:3000',
        },
    }
});
