import { injectable } from 'inversify';
import { register, unregister, call, callServer } from 'rage-rpc';

import { Character } from 'Shared/entity';
import { SharedConstants } from 'Shared/constants';

import { GameConstants } from '~/constants/game';
import { CharacterSelectionConstants } from '~/constants/character-selection';
import CameraManager from '~/managers/camera';
import UIManager from '~/managers/ui';
import PlayerManager from '~/managers/player';
import { hookEvent } from '~/utils/hook-event';
import { handleRPC } from '~/utils/handle-rpc';
import { bind } from '~/container';
import { handleEvent } from '~/utils/handle-event';

const CAMERA_POSITION = new mp.Vector3(1510.9, -1731, 78.5);
const CHARACTER_POSITION = new mp.Vector3(1507.9, -1732.3, 78.65);

@bind()
@injectable()
export default class CharacterSelectionScene {
    private player: PlayerMp;
    private selectedCharacterId: number;
    private cameraHorizontalOffset = 0;
    private camera: SerializedCameraMp = CameraManager.createCamera(
        'characterSelectionCam',
        'default',
        CAMERA_POSITION,
        new mp.Vector3(0, 0, 0),
        60,
    );
    private unhookRender: () => void;

    @handleRPC(CharacterSelectionConstants.RPC.START_CHARACTER_SELECTON_SCENE)
    /**
     * Camera & UI
     */
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

        hookEvent(GameConstants.Events.RENDER, unhook => {
            this.unhookRender = unhook;
            return this.updateCamera;
        });

        register(
            SharedConstants.CharacterSelection.RPC.CREATE_CHARACTER,
            () => {
                mp.gui.chat.push('START_CHARACTER_CREATION_SCENE');
                this.end();
                call(CharacterSelectionConstants.RPC.START_CHARACTER_CREATION_SCENE);
            },
        );

        let unhookCurrentRender;
        register(
            SharedConstants.CharacterSelection.RPC.SELECT_CHARACTER,
            async (characterId: number) => {
                if (unhookCurrentRender) {
                    unhookCurrentRender();
                    unhookCurrentRender = null;
                }
                this.selectedCharacterId = characterId;

                const { appearance }: Character = await callServer(
                    SharedConstants.User.RPC.GET_CHARACTER,
                    characterId
                );

                let direction = -1;
                hookEvent(GameConstants.Events.RENDER, unhook => {
                    unhookCurrentRender = unhook;
                    return () => {
                        const alpha = this.player.getAlpha();
                        if (direction > 0 && alpha === 255) {
                            unhook();
                            return;
                        }
                        if (direction < 0 && !alpha) {
                            PlayerManager.updateCharacterAppearance(
                                JSON.parse(appearance) as CharacterAppearance
                            );
                            direction = 1;
                        }
                        this.player.setAlpha(
                            Math.min(255, Math.max(0, alpha + 51 * direction))
                        );
                    }
                })
            }
        );

        register(
            SharedConstants.CharacterSelection.RPC.START_GAME,
            async () => {
                callServer(
                    SharedConstants.CharacterSelection.RPC.START_GAME,
                    this.selectedCharacterId
                );
            },
        )

        UIManager.show('CharacterSelection');

        return this;
    }

    updateCamera = async (force = false) => {
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

        const x = CHARACTER_POSITION.x + Math.cos(this.cameraHorizontalOffset) * 3;
        const y = CHARACTER_POSITION.y + Math.sin(this.cameraHorizontalOffset) * 3;
        const z = CAMERA_POSITION.z;

        this.camera.setCoord(x, y, z);
        this.camera.pointAtPedBone(
            this.player.handle,
            GameConstants.Bones.SKEL_Head,
            -Math.cos(this.cameraHorizontalOffset) / 3,
            -Math.sin(this.cameraHorizontalOffset) / 3,
            0, true
        );
    }

    @handleEvent(SharedConstants.Game.Events.GAME_STARTED)
    @handleRPC(CharacterSelectionConstants.RPC.END_CHARACTER_SELECTON_SCENE)
    end() {
        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
        
        unregister(SharedConstants.CharacterSelection.RPC.SELECT_CHARACTER);
        unregister(SharedConstants.CharacterSelection.RPC.CREATE_CHARACTER);
        unregister(SharedConstants.CharacterSelection.RPC.START_GAME);
        
        this.unhookRender();
        this.camera.setActiveCamera(false);
        this.player.setInvincible(false);
        this.player.freezePosition(false);

        UIManager.hide('CharacterSelection');
    }
}
