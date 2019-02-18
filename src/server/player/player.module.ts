import { injectable, inject } from 'inversify';
import { UserRepository } from './player.bindings';
import { bind, handleEvent } from '../container';

@bind()
@injectable()
export default class PlayerModule {
    constructor(
        // @inject(UserRepository) private readonly playerRepository: UserRepository,
    ) {}

    async savePlayers() {
        for (let playerMp of mp.players.toArray()) {
            await this.savePlayer(playerMp);
        }
    }

    async savePlayer(playerMp: PlayerMp) {
        // if (typeof playerMp.data.id === 'undefined') {
        //     return;
        // }

        // console.log(`Saving player ${playerMp.name} (${playerMp.data.id})...`);

        // return this.playerRepository.update(playerMp.data.id, {
        //     x: playerMp.position.x,
        //     y: playerMp.position.y,
        //     z: playerMp.position.z,
        //     heading: playerMp.heading,
        // });
    }

    @handleEvent('playerReady')
    onReady(playerMp: PlayerMp) {
        playerMp.call('playerReady');
    }

    @handleEvent('playerDeath')
    onDeath(playerMp: PlayerMp) {
        playerMp.spawn(playerMp.position);
    }

    @handleEvent('playerQuit')
    onQuit(playerMp: PlayerMp) {
        this.savePlayer(playerMp);
    }
}
