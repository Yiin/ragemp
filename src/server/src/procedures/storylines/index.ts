import { bind } from '~/container';
import { injectable, inject } from 'inversify';
import { RPC } from '~/rpc';
import PlayersRepository from '~/repositories/player';
import { CharacterEntityRepository } from '~/repositories/player/bindings';
import { SharedConstants } from 'Shared/constants';

@bind()
@injectable()
export default class Storylines {
    constructor(
        @inject(PlayersRepository)
        private readonly playersRepository: PlayersRepository,

        @inject(CharacterEntityRepository)
        private readonly characterEntityRepository: CharacterEntityRepository,
    ) {}

    @RPC('getStorylines')
    async getStorylines(_: never, { player: playerMp }: PLI) {
        const character = await this.characterEntityRepository.findOne(
            playerMp.getVariable(SharedConstants.PlayerVariables.CHARACTER_ID),
            {
                relations: [
                    'storylines',
                    'storylines.quests',
                    'storylines.quests.availableSteps',
                    'storylines.quests.availableSteps.counters',
                ],
            },
        );
        
        if (character) {
            return character.storylines;
        }
    }

    @RPC('startStoryline')
    async startStoryline(key: string, { player: playerMp }: PLI) {
        const character = await this.playersRepository.getCharacter(
            playerMp.getVariable(SharedConstants.PlayerVariables.CHARACTER_ID),
        );

        if (!character) {
            return;
        }

        
    }
}
