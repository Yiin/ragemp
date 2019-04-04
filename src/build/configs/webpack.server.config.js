const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.source.config');

module.exports = merge(baseConfig, {
    resolve: {
        alias: {
            '~': path.resolve('server/src'),
        },
    },
    entry: {
        'packages/server': './server/src/index.ts',
    },
});
