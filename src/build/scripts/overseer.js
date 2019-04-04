'use strict';

const
    path = require('path'),
    { spawn, exec } = require('child_process'),
    chokidar = require('chokidar'),
    ipc = require('node-ipc'),
    chalk = require('chalk'),
    findUp = require('find-up')
;

let server;
let killResolver;

// helper methods
const log = (...args) => console.log(chalk`[{yellow Overseer}]`, ...args);
const error = (...args) => console.error(chalk`[{red Overseer}]`, ...args);
const startBuild = () => spawn('npm.cmd', ['run', 'build'], {
    stdio: 'inherit'
});
const killServer = () => {
    server.kill('SIGKILL');
    // exec('taskkill /pid ' + server.pid + ' /T /F');
    server = undefined;
};

let SERVER_EXE;

findUp('server.exe').then(path => {
    if (path) {
        SERVER_EXE = path;
    } else {
        error('server.exe was not found.');
        process.exit();
    }
});


// IPC
ipc.config.id = 'ragemp-server-overseer';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(() => {
    ipc.server.on('accept-death', () => {
        if (server) {
            killServer();
        }

        if (killResolver) {
            killResolver();
        }
    });
});
ipc.server.start();

const buildProcesses = {
    client: null,
    ui: null,
    server: null,
    source: null
};

const sourceHandler = type => async () => {
    if (server) {
        if (server.notifyBeforeKill) {
            log('Gently killing server...');
            await server.notifyBeforeKill();
        } else {
            log('Killing server...');
            killServer();
        }
    }

    if (buildProcesses[type]) {
        buildProcesses[type].kill('SIGKILL');
    }

    buildProcesses[type] = spawn(
        'npm.cmd', ['run', `build:${type}`],
        { stdio: 'inherit' },
    );

    buildProcesses[type].on('close', (code, signal) => {
        if (signal === 'SIGKILL') {
            return;
        }
        buildProcesses[type] = null;

        if (server) {
            server.kill('SIGKILL');
        }

        if (code === 2) {
            // Build failed
            return;
        }

        log(`${type} was built successfully!`);

        if (Object.values(buildProcesses).some(Boolean)) {
            return;
        }

        log('Starting server...');
        server = spawn(SERVER_EXE, [], {
            stdio: 'inherit',
            cwd: path.dirname(SERVER_EXE),
        });

        server.on('close', () => {
            server = undefined;
        });

        ipc.connectTo('ragemp-server', () => {
            ipc.of['ragemp-server'].on('connect', () => {
                server.notifyBeforeKill = () => new Promise(resolve => {
                    killResolver = resolve;
                    ipc.of['ragemp-server'].emit('death');
                });
            });
        });
    });
}

const clientSourceWatcher = chokidar.watch('./client/src');
const uiSourceWatcher = chokidar.watch('./client/UserInterface');
const serverSourceWatcher = chokidar.watch('./server/src');
const sharedSourceWatcher = chokidar.watch('./shared');

for (const [watcher, handler] of [
    [clientSourceWatcher, sourceHandler('client')],
    [uiSourceWatcher, sourceHandler('ui')],
    [serverSourceWatcher, sourceHandler('server')],
    [sharedSourceWatcher, sourceHandler('source')],
]) {
    watcher.on('ready', () => {
        if (watcher !== sharedSourceWatcher) {
            handler();
        }
        watcher.on('all', handler);
    });
}
