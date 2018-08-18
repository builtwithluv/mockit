const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');

module.exports = {
    ...common,
    entry: {
        'client/bundle': './src/client/index.jsx',
    },
    output: {
        path: __dirname + '/lib',
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(['lib']),
        new CopyWebpackPlugin([
            { from: 'src/.bin', to: '.bin' },
        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: false,
        }),
    ],
};
