const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    output: {
        path: path.resolve('..'),
        filename: '[name]/index.js',
    },
    externals: [
        nodeExternals({
            whitelist: /[^typeorm]/,
        }),
    ],
    resolve: {
        alias: {
            Shared: path.resolve('shared'),
        },
        extensions: ['.ts', '.js'],
    },
    optimization: {
        minimize: false,
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
};
