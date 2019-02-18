'use strict';

const
    { spawn, exec } = require('child_process'),
    chokidar = require('chokidar'),
    ipc = require('node-ipc'),
    chalk = require('chalk')
;

let build;
let server;
let killResolver;

// helper methods
const log = (...args) => console.log(chalk`[{yellow Overseer}]`, ...args);
const startBuild = () => spawn('npm.cmd', ['run', 'build'], {
    stdio: 'inherit'
});
const killServer = () => exec('taskkill /pid ' + server.pid + ' /T /F');

// IPC
ipc.config.id = 'ragemp-server-overseer';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(() => {
    ipc.server.on('accept-death', () => {
        if (server) {
            killServer();
            server = undefined;
        }

        if (killResolver) {
            killResolver();
        }
    });
});
ipc.server.start();

async function init(event, path) {
    if (server) {
        if (server.notifyBeforeKill) {
            log('Gently killing server...');
            await server.notifyBeforeKill();
        } else {
            log('Killing server...');
            killServer();
        }
    }
    if (build) {
        log('Killing build...');
        build.kill();
    }

    log('Building...');
    build = startBuild();
    
    build.on('close' /* Build finished */, () => {
        log('Build finished');

        if (server) {
            killServer();
            server = undefined;
            return;
        }
        log('Starting server...');
        server = spawn('server.exe', [], {
            stdio: 'inherit'
        });

        ipc.connectTo('ragemp-server', () => {
            ipc.of['ragemp-server'].on('connect', () => {
                if (!server) {
                    return;
                }
                server.notifyBeforeKill = () => new Promise(resolve => {
                    killResolver = resolve;

                    ipc.of['ragemp-server'].emit('death', 'Omae wa mou shindeiru');
                });
            });
        });
    });
}

const watcher = chokidar.watch('./src');

watcher.on('ready', () => {
    init();
    watcher.on('all', init);
});
