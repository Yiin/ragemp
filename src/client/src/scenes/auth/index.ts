import { injectable } from 'inversify';
import * as rpc from 'rage-rpc';
import { SharedConstants } from 'Shared/constants';
import { AuthConstants } from '~/constants/auth';

import UIManager from '~/managers/ui';
import { handleEvent } from '~/utils/handle-event';
import { bind } from '~/container';
import { log } from '~/debug';

@bind()
@injectable()
export default class AuthScene {
    @handleEvent(SharedConstants.Auth.Events.PLAYER_READY_FOR_AUTHENTICATION)
    /**
     * Try to login with saved token if we have one, otherwise show auth forms.
     */
    async start() {
        log('ready for auth');
        const { auth } = mp.storage.data;

        if (auth) {
            const { data, token } = auth;
            const isTokenValid = await rpc.callServer(
                SharedConstants.Auth.RPC.SUBMIT_AUTH_TOKEN, {
                    token,
                    data,
                }
            );

            if (isTokenValid) {
                rpc.call(AuthConstants.RPC.AFTER_PLAYER_LOGIN, auth);
                return;
            }
        }

        UIManager.show('Auth');
        mp.gui.chat.activate(false);
        mp.gui.cursor.show(true, true);
    }

    @handleEvent(AuthConstants.Events.AFTER_PLAYER_LOGIN)
    /**
     * We succesfully logged in, hide auth forms.
     */
    end() {
        UIManager.hide('Auth');
        mp.gui.chat.activate(true);
        mp.gui.cursor.show(false, false);
    }
}

