const path = require('path');
const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

const browsers = dirs('src/client/UserInterface').reduce((entries, dir) => {
    const folderName = path.basename(dir);
    return [...entries, folderName];
}, []);

module.exports = ({ browser } = {}) => ({
    resolve: {
        extensions: ['.js'],
    },
    entry: {
        ...browsers.reduce((entries, name) => ({
            ...entries,
            [`client_packages/UserInterface/${name}`]: [
                'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
                browser && './src/client/UserInterface/browser-mocks.js',
                `./src/client/UserInterface/${name}/index.js`,
            ].filter(Boolean),
        }), {}),
    },
    output: {
        path: path.resolve(__dirname),
        filename: `[name]/bundle.js`,
        hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: '.hot/[hash].hot-update.json',
    },
    target: 'web',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendors',
                    filename: 'client_packages/UserInterface/[name].js',
                    test: /[\\/]node_modules[\\/](?!.*\.css$)/,
                },
            },
        },
    },
    plugins: [        
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name]/style.css',
            chunkFilename: '[name]/[id].css',
        }),
        new CopyWebpackPlugin(
            browsers.map(name => ({
                from: 'src/client/UserInterface/index.html',
                to: `client_packages/UserInterface/${name}/index.html`,
            })),
        ),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test:/\.css?$/,
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
                test: /\.jsx?$/,
                use: [
                    { loader: 'babel-loader' },
                ],
            },
        ],
    },
});
