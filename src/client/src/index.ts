import 'core-js/features/reflect';
import 'rage-rpc';

import './sentry'; // error tracking
import './vendors/rage-editor';
import './vendors/fly';
import { containerPromises } from './container';
import { log } from './debug';

const serverReady = new Promise(resolve => {
    mp.events.add('serverReady', () => {
        mp.events.remove('serverReady');
        resolve();
    });
})

const init = async () => {
    await import('./debug');
    await import('./scenes/auth');
    await import('./scenes/character-creation');
    await import('./scenes/character-selection');
    await import('./dialogs/storylines');

    log('awaiting container promises');
    await Promise.all(containerPromises);
    
    await serverReady;
    log('initiating player...');
    mp.events.callRemote('playerInitiated');
};

init();
