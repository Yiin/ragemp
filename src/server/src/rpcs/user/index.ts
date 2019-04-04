import { injectable, inject } from 'inversify';
import { SharedConstants } from 'Shared/constants';
import { RPC } from '~/rpc';
import { bind } from '~/container';
import PlayersRepository from '~/repositories/player';

@bind()
@injectable()
export default class UserRPCs {
    constructor(
        @inject(PlayersRepository)
        private readonly playersRepository: PlayersRepository,
    ) {}

    @RPC(SharedConstants.User.RPC.GET_CHARACTERS)
    async getCharacters(_: never, { player: playerMp }: PLI) {
        console.log('getUser');
        const user = await this.playersRepository.getUser(playerMp);
        
        if (user) {
            console.log('user.characters', await user.characters);
            return await user.characters;
        }
        return [];
    }

    @RPC(SharedConstants.User.RPC.GET_CHARACTER)
    async getCharacter(characterId: number, { player: playerMp }: PLI) {
        const user = await this.playersRepository.getUser(playerMp);

        if (user) {
            const characters = await user.characters;

            return characters.find(({ id }) => id === characterId);
        }
    }
}
