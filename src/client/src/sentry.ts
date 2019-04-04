import { callServer } from 'rage-rpc';
import { SharedConstants } from 'Shared/constants';
import { log } from './debug';

export const captureException = e => {
    callServer(
        SharedConstants.Sentry.RPC.CAPTURE_EXCEPTION,
        {
            name: e.name,
            message: e.message,
            stack: e.stack,
        },
    );
}
