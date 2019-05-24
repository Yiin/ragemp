import { injectable } from 'inversify';
import { call, callServer } from 'rage-rpc';

import { SharedConstants } from 'Shared/constants';

import { AuthConstants } from '~/constants/auth';
import { CharacterSelectionConstants } from '~/constants/character-selection';
import UIManager from '~/managers/ui';
import { handleRPC } from '~/utils/handle-rpc';
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
        const { auth } = mp.storage.data;

        if (auth) {
            const { data, token } = auth;
            const isTokenValid = await callServer(
                SharedConstants.Auth.RPC.SUBMIT_AUTH_TOKEN, {
                    token,
                    data,
                }
            );

            if (isTokenValid) {
                call(AuthConstants.RPC.AFTER_PLAYER_LOGIN, auth);
                return;
            }
        }

        UIManager.show('Auth');
        mp.gui.chat.activate(false);
        mp.gui.cursor.show(true, true);
    }

    /**
     * Decide which scene should be shown next.
     */
    async decideNextScene(auth: LoginResponse) {
        mp.storage.data.auth = auth;
        mp.storage.flush();
        // Save auth token

        const { length: charactersCount }: Character[] = await callServer(
            SharedConstants.User.RPC.GET_CHARACTERS
        );

        if (charactersCount === 0) {
            call(CharacterSelectionConstants.RPC.START_CHARACTER_CREATION_SCENE);
            // Forward player to character creation scene because he has no characters
        } else {
            call(CharacterSelectionConstants.RPC.START_CHARACTER_SELECTION_SCENE);
            // Start character selection scene
        }
    }

    @handleRPC(AuthConstants.RPC.AFTER_PLAYER_LOGIN)
    /**
     * We succesfully logged in, hide auth forms.
     */
    end(auth: LoginResponse) {
        UIManager.hide('Auth');
        mp.gui.chat.activate(true);
        mp.gui.cursor.show(false, false);

        this.decideNextScene(auth);
    }
}

