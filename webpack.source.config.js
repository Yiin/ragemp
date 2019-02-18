const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env = {}) => ({
    externals: [
        nodeExternals(),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    entry: {
        'packages/server': './src/server/index.ts',
        'client_packages': './src/client/index.ts',
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name]/index.js',
    },
    optimization: {
        minimize: false,
    },
    devtool: 'source-map',
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
});
