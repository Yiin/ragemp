import './bindings';
import { inject, injectable } from 'inversify';
import { User, Character } from 'Shared/entity';
import { bind, handleEvent } from '~/container';
import { UserEntityRepository, CharacterEntityRepository } from './bindings';
import { GameConstants } from '~/constants/game';
import { ServerConstants } from '~/constants/server';
import { SharedConstants } from 'Shared/constants';
import { PlayerVariables } from 'Shared/constants/player-variables';
import { FindOneOptions } from 'typeorm';

@bind()
@injectable()
export default class PlayersRepository {
    constructor(
        @inject(UserEntityRepository)
        private readonly userEntityRepository: UserEntityRepository,

        @inject(CharacterEntityRepository)
        private readonly characterEntityRepository: CharacterEntityRepository,
    ) {}

    private readonly players = new Proxy({}, {
        set: (target, p: PropertyKey, value: any): boolean => {
            target[p] = value;
            return true;
        },
        get: async (target, p: PropertyKey): Promise<User | undefined> => {
            if (typeof target[p] !== 'undefined') {
                return this.fetchUser(target[p]);
            }
            return await undefined;
        }
    });

    fetchUser(userId: string | number, options?: FindOneOptions<User>) {
        return this.userEntityRepository.findOne(userId, options);
    }

    getUser(playerMp: PlayerMp): Promise<User | undefined> {
        return this.players[playerMp.id];
    }

    async getCharacter(playerMp: PlayerMp): Promise<Character | undefined> {
        const user = await this.getUser(playerMp);

        if (user) {
            const characters = await user.characters;

            return characters.find(character => (
                character.id === playerMp.getVariable(PlayerVariables.CHARACTER_ID)
            ));
        }
    }

    @handleEvent(ServerConstants.Auth.Events.USER_LOGIN)
    onUserLogin(playerMp: PlayerMp, user: User): void {
        this.players[playerMp.id] = user.id;
    }

    @handleEvent(GameConstants.Events.PLAYER_QUIT)
    onPlayerQuit(playerMp: PlayerMp) {
        this.players[playerMp.id] = undefined;

        // Save character data
        const characterId = playerMp.getVariable(
            SharedConstants.PlayerVariables.CHARACTER_ID
        );

        console.log('characterId', characterId);
        if (characterId) {
            console.log('saving character', {
                id: characterId,
                x: playerMp.position.x,
                y: playerMp.position.y,
                z: playerMp.position.z,
                heading: playerMp.heading,
            });

            this.characterEntityRepository.save({
                id: characterId,
                x: playerMp.position.x,
                y: playerMp.position.y,
                z: playerMp.position.z,
                heading: playerMp.heading,
            });
        }
    }
}
