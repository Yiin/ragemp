import './sentry';
import './debug.commands';
import './debug.events';
import { register } from 'rage-rpc';

register('log', args => {
    console.log('Client:', ...args);
});
