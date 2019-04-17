import { injectable, inject } from 'inversify';
import { SharedConstants } from 'Shared/constants';
import { RPC } from '~/rpc';
import { bind } from '~/container';
import PlayersRepository from '~/repositories/player';
import { CharacterEntityRepository } from '~/repositories/player/bindings';

@bind()
@injectable()
export default class UserProcedures {
    constructor(
        @inject(PlayersRepository)
        private readonly playersRepository: PlayersRepository,

        @inject(CharacterEntityRepository)
        private readonly characterEntityRepository: CharacterEntityRepository,
    ) {}

    @RPC(SharedConstants.User.RPC.GET_CHARACTERS)
    async getCharacters(_: never, { player: playerMp }: PLI) {
        const user = await this.playersRepository.getUser(playerMp);
        
        if (user) {
            return user.characters;
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

    @RPC(SharedConstants.User.RPC.DELETE_CHARACTER)
    async deleteCharacter(characterId: number, { player: playerMp }: PLI) {
        const user = await this.playersRepository.getUser(playerMp);
    
        if (user) {
            return this.characterEntityRepository.delete(characterId);
        }
    }
}
