const path = require('path');

// Webkpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, '../src/main.ts'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
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
    plugins: [],
};
