import { callServer } from 'rage-rpc';
import { SharedConstants } from 'Shared/constants';

export const captureException = e => {
    mp.gui.chat.push(`[${e.name}] ${e.message}`);

    mp.gui.chat.push(e.stack.split('\n').shift());

    callServer(
        SharedConstants.Sentry.RPC.CAPTURE_EXCEPTION,
        {
            name: e.name,
            message: e.message,
            stack: e.stack,
        },
    );
}
