import path from 'path';
import fs from 'fs';
import * as Sentry from '@sentry/node';
import retrace from 'retrace';
import { register, ProcedureListenerInfo } from 'rage-rpc';
import { SharedConstants } from 'Shared/constants';
import PlayersRepository from '~/repositories/player';
import container from '~/container';

Sentry.init({ dsn: process.env.SENTRY_DSN });

retrace.resolve = () => JSON.parse(fs.readFileSync(
    path.resolve('client_packages/index.js.map'),
    'utf8'
));

/**
 * Returns stack trace with references to actual source files.
 * 
 * @param stack Stack trace from bundled code
 */
async function retraceStack(stack) {
    stack = stack.split('\n');
    stack = stack.splice(0, stack.length - 4).join('\n');
    // Remove last 4 lines that references to internal source.

    return await retrace.map(stack);
}

register(
    SharedConstants.Sentry.RPC.CAPTURE_EXCEPTION,
    async (e, { player: playerMp }: ProcedureListenerInfo) => {
        console.log(e);
        try {
            const user = await container.resolve<PlayersRepository>(PlayersRepository)
                .getUser(playerMp as PlayerMp);
            
            const error = new Error(e.message);
            error.name = e.name;
            error.stack = await retraceStack(e.stack);


            if (user) {
                Sentry.withScope((scope) => {
                    scope.setUser({
                        id: user.id.toString(),
                        email: user.email,
                        username: user.username,
                    });
                    Sentry.captureException(error);
                });
            } else {
                Sentry.captureException(error);
            }
        } catch (e) {
            Sentry.captureException(e);
        }
    }
);
