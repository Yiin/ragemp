import 'core-js/features/reflect';
import { callServer } from 'rage-rpc';

import './sentry'; // error tracking
import './vendors/rage-editor';
import './vendors/fly';
import { SharedConstants } from 'Shared/constants';
import { containerPromises } from './container';

mp.events.add(SharedConstants.Auth.Events.PLAYER_READY_FOR_AUTHENTICATION, () => {
    mp.gui.chat.push('Ready for authentication');
})

const init = async () => {
    await import('./debug');
    await import('./scenes/auth');
    await import('./scenes/character-creation');
    await import('./scenes/character-selection');

    await Promise.all(containerPromises);

    callServer('playerInitiated');
};

init();
