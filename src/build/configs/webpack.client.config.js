const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.source.config');
const { config } = require('dotenv');

config({ path: path.resolve('.env') });

module.exports = merge(baseConfig, {
    resolve: {
        alias: {
            '~': path.resolve('client/src'),
        },
    },
    entry: {
        'client_packages': './client/src/index.ts',
    },
    devtool: 'source-map',
    plugins: [
        new webpack.EnvironmentPlugin({
            SENTRY_DSN: process.env.SENTRY_DSN,
        }),
    ],
});
