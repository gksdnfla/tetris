const path = require('path');

module.exports = {
    entry: path.join(__dirname, '../src/index.ts'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        clean: true,
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
