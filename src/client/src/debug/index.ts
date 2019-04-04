import './debug.events';
import './debug.events';
import './debug.events';
import { callServer } from 'rage-rpc';

export const log = (...args) => {
    callServer('log', args);
};
