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
        extensions: ['.ts', '.js', '.md'],
    },
    optimization: {
        minimize: false,
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    { loader: 'raw-loader' },
                    { loader: 'markdown-loader' },
                ],
            },
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
