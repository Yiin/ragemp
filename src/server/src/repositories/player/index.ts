import './bindings';
import { inject, injectable } from 'inversify';
import { User } from 'Shared/entity';
import { bind, handleEvent } from '~/container';
import { UserEntityRepository } from './bindings';
import { GameConstants } from '~/constants/game';
import { ServerConstants } from '~/constants/server';

@bind()
@injectable()
export default class PlayersRepository {
    constructor(
        @inject(UserEntityRepository)
        private readonly userEntityRepository: UserEntityRepository,
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

    fetchUser(userId: string | number) {
        return this.userEntityRepository.findOne(userId);
    }

    getUser(playerMp: PlayerMp): Promise<User | undefined> {
        return this.players[playerMp.id];
    }

    @handleEvent(ServerConstants.Auth.Events.USER_LOGIN)
    onUserLogin(playerMp: PlayerMp, user: User): void {
        this.players[playerMp.id] = user.id;
    }

    @handleEvent(GameConstants.Events.PLAYER_QUIT)
    onPlayerQuit(playerMp: PlayerMp) {
        this.players[playerMp.id] = undefined;
    }
}
