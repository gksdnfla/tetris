const path = require('path');

// Webkpack plugins
const RunNodeWebpackPlugin = require('run-node-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, '../src/main.ts'),
        index: path.join(__dirname, '../public/scripts/index.ts'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename(pathData) {
            return pathData.chunk.name === 'main'
                ? '[name].js'
                : 'public/scripts/[name].[contenthash].js';
        },
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.json', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new RunNodeWebpackPlugin({ scriptToRun: 'main.js' }),
        new HtmlWebpackPlugin({
            title: 'Tetris',
            template: path.join(__dirname, '../public/index.html'),
            filename: 'public/index.html',
            inject: false,
        }),
        new MiniCssExtractPlugin({
            linkType: 'text/css',
            filename: 'public/styles/[name].[hash].css',
        }),
    ],
};
