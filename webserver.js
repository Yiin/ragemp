const fs = require('fs');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.ui.config');

const app = express();
const compiler = webpack({
    mode: 'development',
    ...webpackConfig,
});

app.use(webpackHotMiddleware(compiler));

// static assets
app.use('/.hot', express.static(path.join(__dirname, '.hot')));


const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());
const browsers = dirs('src/client/Browsers').reduce((entries, dir) => [
    ...entries,
    path.basename(dir)
], []);

browsers.forEach(page => {
    const dir = path.resolve(__dirname, `client_packages/Browsers/${page}`);

    const devMiddleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: dir,
        writeToDisk: true,
    });

    devMiddleware.waitUntilValid(() => {
        console.log(`[ready] ${page}`);
    });

    app.use(devMiddleware);
    app.use(express.static(dir));

    app.get(`/${page}`, (req, res) =>
        res.sendFile(path.resolve(__dirname, `./client_packages/Browsers/${page}/index.html`))
    );
});

// app start up
app.listen(3000, () => console.log('App listening on port 3000!'));
