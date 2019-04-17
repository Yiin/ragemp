const path = require('path');
const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());
const browsers = dirs(path.resolve('client/UserInterface')).reduce((entries, dir) => {
    const folderName = path.basename(dir);
    if (folderName.startsWith('_')) {
        return entries;
    }
    return [...entries, folderName];
}, []);

module.exports = ({ browser } = {}) => browsers.map(uiName => {
    const outputPath = path.resolve(`../client_packages/UserInterface/${uiName}`);

    return {
        resolve: {
            alias: {
                '~': path.resolve('client/src'),
                Shared: path.resolve('shared'),
            },
            extensions: ['.js', '.ts', '.tsx'],
        },
        entry: [
            browser && '@babel/polyfill',
            browser && './client/UserInterface/browser-mocks.js',
            `./client/UserInterface/${uiName}/index.js`,
            browser && `webpack-hot-middleware/client?path=/${uiName}__webpack_hmr&timeout=20000`,
        ].filter(Boolean),
        output: {
            path: outputPath,
            publicPath: `/${uiName}/`,
            filename: 'bundle.js',
            hotUpdateChunkFilename: '../.hot/[id].[hash].hot-update.js',
            hotUpdateMainFilename: '../.hot/[hash].hot-update.json',
        },
        performance: {
            hints: false,
        },
        devtool: 'source-map',
        target: 'web',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'initial',
                        name: 'vendors',
                        filename: '[name].js',
                        test: /[\\/]node_modules[\\/](?!.*\.css$)/,
                    },
                },
            },
        },
        plugins: [        
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'style.css',
                chunkFilename: '[id].css',
            }),
            new CopyWebpackPlugin([{
                from: path.resolve('client/UserInterface/index.html'),
                to: path.resolve(`../client_packages/UserInterface/${uiName}/index.html`),
            }]),
            new webpack.HotModuleReplacementPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'url-loader',
                    ],
                },
                {
                    test: /\.md$/,
                    use: [
                        'raw-loader',
                        'markdown-loader',
                    ],
                },
                {
                    test: /\.css?$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(j|t)sx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
                },
            ],
        },
    }
});
