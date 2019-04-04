const fs = require('fs');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfigs = require('../configs/webpack.ui.config')({ browser: true });

const app = express();

process.stdout.write = (write => (...args) =>
    !args[0].match(/wdm/)
        && (app.listening || !args[0].match(/webpack/))
            && write.apply(process.stdout, args)
)(process.stdout.write);

const makeCompiler = config => webpack({
    mode: 'development',
    ...config,
});

// static assets
app.use('/', express.static(path.resolve('../client_packages/UserInterface')));
app.use('/.hot', express.static(path.resolve('../.hot')));

const built = [];

webpackConfigs.forEach(config => {
    const { output: { path: outputPath, publicPath } } = config;
    const uiName = outputPath.split(/[/\\]/).pop();

    if (process.argv[2] && process.argv[2] !== uiName) {
        return;
    }

    console.log(chalk`[{yellow compiling}] ${uiName}`);

    const compiler = makeCompiler(config);

    const devMiddleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        progress: true,
        publicPath,
        writeToDisk: true,
        stats: 'errors-only',
    });

    built.push(new Promise(resolve => {
        devMiddleware.waitUntilValid(() => {
            app.use(`/${uiName}`, express.static(outputPath));
            app.get(`/${uiName}`, (req, res) =>
                res.sendFile(`${outputPath}/index.html`)
            );
            console.log(chalk`[{green ready}] ${uiName}`);
            resolve();
        });
    }));

    app
        .use(devMiddleware)
        .use(webpackHotMiddleware(compiler, {
            noInfo: true,
            path: `${publicPath.replace(/\/$/, '')}__webpack_hmr`,
            heartbeat: 20 * 1000,
        }));
});

// app start up
Promise.all(built).then(() => {
    app.listen(3000, () => console.log('App listening on port 3000!'));
    app.listening = true;
});
