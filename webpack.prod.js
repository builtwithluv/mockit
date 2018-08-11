const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'client/bundle': './src/client/index.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'client/fonts'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            '@': path.resolve('src'),
            '@client': path.resolve('src', 'client'),
            '@server': path.resolve('src', 'server'),
        },
    },
    output: {
        path: __dirname + '/lib',
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(['lib']),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: false,
        }),
    ],
};
