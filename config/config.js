const webpackDevConfig = require('./webpack.dev');
const webpackProdConfig = require('./webpack.prod');

const ENV = process.env.NODE_ENV;
let config = {};

if (ENV === 'development') {
    config = webpackDevConfig;
} else {
    config = webpackProdConfig;
}

module.exports = {
    mode: ENV,
    target: 'node',
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    },
    ...config,
};
