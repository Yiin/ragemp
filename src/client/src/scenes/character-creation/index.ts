import { injectable } from 'inversify';
import * as rpc from 'rage-rpc';

import { hookEvent } from '~/utils/hook-event';
import CameraManager from '~/managers/camera';
import UIManager from '~/managers/ui';
import PlayerManager from '~/managers/player';
import { handleRPC } from '~/utils/handle-rpc';
import { CharacterSelectionConstants } from '~/constants/character-selection';
import { CharacterCreationConstants } from '~/constants/character-creation';
import { GameConstants } from '~/constants/game';
import { bind } from '~/container';
import { log } from '~/debug';
import { handleEvent } from '~/utils/handle-event';

const CAMERA_POSITION = new mp.Vector3(1508.8, -1731.9, 79.3);
const CHARACTER_POSITION = new mp.Vector3(1507.9, -1732.3, 78.65);

@bind()
@injectable()
export default class CharacterCreationScene {
    private unhookRender: () => void;
    private unhookBrowserInputFocusChanged: () => void;
    private disableCameraMovements: boolean = false;
    private player: PlayerMp;
    private cameraHorizontalOffset = 0;
    private cameraVerticalOffset = 0;
    private camera: SerializedCameraMp = CameraManager.createCamera(
        'characterCreationCam',
        'default',
        CAMERA_POSITION,
        new mp.Vector3(0, 0, 0),
        60,
    );

    @handleRPC(CharacterSelectionConstants.RPC.START_CHARACTER_CREATION_SCENE)
    start() {
        mp.gui.chat.activate(false);
        mp.gui.cursor.show(true, true);
        this.camera.setActiveCamera(true);

        this.player = mp.players.local;

        const z = mp.game.gameplay.getGroundZFor3dCoord(
            CHARACTER_POSITION.x,
            CHARACTER_POSITION.y,
            CHARACTER_POSITION.z,
            1000,
            false,
        );

        this.player.setCoords(
            CHARACTER_POSITION.x,
            CHARACTER_POSITION.y,
            z,
            false, false, false, false,
        );

        if (!z) {
            setTimeout(this.start.bind(this), 500);
            // While area is not streamed in, we won't be able to get correct Z coordinate
            // so retry until we do.
            return this;
        }

        this.player.setHeading(288);
        this.player.setInvincible(true);
        this.player.freezePosition(true);
        this.player.model = mp.game.joaat('mp_m_freemode_01');

        this.player.setComponentVariation(3, 15, 0, 2);
        this.player.setComponentVariation(4, 61, 0, 2);
        this.player.setComponentVariation(6, 34, 0, 2);
        this.player.setComponentVariation(8, 15, 0, 2);
        this.player.setComponentVariation(11, 15, 0, 2);

        this.updateCamera(true);

        rpc.register(
            CharacterCreationConstants.RPC.UPDATE_CHARACTER_FEATURES,
            PlayerManager.updateCharacterAppearance
        );

        UIManager.show('CharacterCreation');

        hookEvent(GameConstants.Events.RENDER, unhook => {
            this.unhookRender = unhook;
            return this.updateCamera;
        });

        hookEvent(GameConstants.Events.BROWSER_INPUT_FOCUS_CHANGED, unhook => {
            this.unhookBrowserInputFocusChanged = unhook;
            return isInputFocused => {
                this.disableCameraMovements = isInputFocused;
            };
        });

        return this;
    }

    updateCamera = async (force = false) => {
        if (this.disableCameraMovements) {
            return;
        }

        const keys = {
            UP: GameConstants.VK.W,
            LEFT: GameConstants.VK.A,
            DOWN: GameConstants.VK.S,
            RIGHT: GameConstants.VK.D,
        };

        if (!force && !Object.values(keys).some(key => mp.keys.isDown(key))) {
            return;
        }

        if (mp.keys.isDown(keys.LEFT)) {
            this.cameraHorizontalOffset -= 0.02;
        }
        if (mp.keys.isDown(keys.RIGHT)) {
            this.cameraHorizontalOffset += 0.02;
        }
        if (mp.keys.isDown(keys.UP)) {
            this.cameraVerticalOffset = Math.max(
                -0.5, Math.min(
                    0.5, this.cameraVerticalOffset + 0.02
                )
            );
        }
        if (mp.keys.isDown(keys.DOWN)) {
            this.cameraVerticalOffset = Math.max(
                -0.5, Math.min(
                    0.5, this.cameraVerticalOffset - 0.02
                )
            );
        }

        const x = CHARACTER_POSITION.x + Math.cos(this.cameraHorizontalOffset);
        const y = CHARACTER_POSITION.y + Math.sin(this.cameraHorizontalOffset);
        const z = CAMERA_POSITION.z + Math.tan(this.cameraVerticalOffset);

        this.camera.setCoord(x, y, z);
        this.camera.pointAtPedBone(
            this.player.handle,
            GameConstants.Bones.SKEL_Head,
            -Math.cos(this.cameraHorizontalOffset) / 3,
            -Math.sin(this.cameraHorizontalOffset) / 3,
            0, true
        );
    }

    @handleEvent(CharacterCreationConstants.Events.CHARACTER_CREATED)
    onCharacterCreated() {
        this.end();
        rpc.call(CharacterSelectionConstants.RPC.START_CHARACTER_SELECTON_SCENE);
    }

    @handleRPC(CharacterSelectionConstants.RPC.END_CHARACTER_CREATION_SCENE)
    end() {
        mp.gui.chat.activate(true);
        mp.gui.cursor.show(false, false);
        rpc.unregister(CharacterCreationConstants.RPC.UPDATE_CHARACTER_FEATURES);

        this.unhookRender();
        this.unhookBrowserInputFocusChanged();
        this.camera.setActiveCamera(false);
        this.player.setInvincible(false);
        this.player.freezePosition(false);

        UIManager.hide('CharacterCreation');
    }
}
