/// <reference types="ragemp-s" />

import { config } from 'dotenv';
config();
// Initialize .env config values

import ipc from 'node-ipc';
// The process.on('exit') event doesn't catch all the ways a process can exit.
// This package is useful for cleaning up before exiting.

import container from './container';
import { getConnection, createConnection } from 'typeorm';
import { TYPE_ORM_CONFIG } from './typeorm.config';

const init = async () => {
    try {
        await createConnection(TYPE_ORM_CONFIG)
        console.log('Connected to database!');
    } catch (e) {
        console.log(e);
        process.exit();
    }

    await import('./debug');
    await import('./player');
    await import('./auth');
    // Initialize server stuff
};

init();

// for dev purposes
ipc.config.id = 'ragemp-server';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(() => ipc.server.on('death', message => {
    console.log(message);
    ipc.connectTo('ragemp-server-overseer', () => {
        ipc.of['ragemp-server-overseer'].on('connect', async () => {
            // await container.get((await import('./player/player.module')).default).savePlayers();
            await getConnection().close();
            ipc.of['ragemp-server-overseer'].emit('accept-death');
        });
    });
}));
ipc.server.start();
