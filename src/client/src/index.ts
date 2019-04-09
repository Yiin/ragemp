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
    mp.gui.chat.push('init');
    await import('./debug');
    await import('./scenes/auth');
    await import('./scenes/character-creation');
    await import('./scenes/character-selection');
    
    mp.gui.chat.push('awaiting container promises');
    log('awaiting container promises');
    await Promise.all(containerPromises);
    
    await serverReady;
    mp.gui.chat.push('initiating player...');
    log('initiating player...');
    mp.events.callRemote('playerInitiated');
};

init();
