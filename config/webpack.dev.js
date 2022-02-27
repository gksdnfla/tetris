const path = require('path');

// Webkpack plugins
const RunNodeWebpackPlugin = require('run-node-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, '../src/index.ts'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash].js',
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
        ],
    },
    plugins: [new RunNodeWebpackPlugin({ scriptToRun: 'main.js' })],
};
