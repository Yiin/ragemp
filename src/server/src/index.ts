import path from 'path';
import chalk from 'chalk';
import token from 'token';
import { config } from 'dotenv';

config({ path: path.resolve('src/.env') });
// Initialize .env config values

import ipc from 'node-ipc';
// The process.on('exit') event doesn't catch all the ways a process can exit.
// This package is useful for cleaning up before exiting.

import { createConnection } from 'typeorm';
import { TYPE_ORM_CONFIG } from './typeorm.config';

const init = async () => {
    const connect = async (tries = 0) => {
        try {
            await createConnection(TYPE_ORM_CONFIG)
            console.log(chalk`[{green Database}] Connected successfully!`);
        } catch (e) {
            if (tries < 3) {
                console.log(chalk`[{yellow Database}] Trying to reconnect...`);
                await connect(tries + 1);
            } else {
                console.log(chalk`[{red Database}] ${e.message}`);
                process.exit();
            }
        }
    }

    token.defaults.secret = process.env.TOKEN_SECRET;

    await connect();

    await import('./debug');
    // Debug

    await import('./repositories/player');
    // Repositories

    await import('./rpcs/user');
    // Rpcs

    await import('./scenes/auth');
    await import('./scenes/character-selection');
    // Scenes
};

init();

// for dev purposes
ipc.config.id = 'ragemp-server';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(() => ipc.server.on('death', () => {
    ipc.connectTo('ragemp-server-overseer', () => {
        ipc.of['ragemp-server-overseer'].on('connect', async () => {
            // TODO: Save connected players
            ipc.of['ragemp-server-overseer'].emit('accept-death');
        });
    });
}));
ipc.server.start();
