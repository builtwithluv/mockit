const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common');

module.exports = {
    ...common,
    mode: 'production',
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
        new BundleAnalyzerPlugin(),
    ],
};
