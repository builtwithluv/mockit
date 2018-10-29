const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    entry: {
        bundle: './src/client/index.jsx',
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.join(__dirname, 'lib', 'client'),
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin(),
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['lib']),
        new CopyWebpackPlugin([
            { from: 'src/.bin', to: path.join('..', '.bin') },
            { from: 'src/index.pug', to: path.join('..', 'index.pug') },
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
});
