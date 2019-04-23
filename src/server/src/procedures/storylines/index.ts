import { bind } from '~/container';
import { injectable, inject } from 'inversify';
import { RPC } from '~/rpc';
import PlayersRepository from '~/repositories/player';
import { CharacterEntityRepository } from '~/repositories/player/bindings';
import { SharedConstants } from 'Shared/constants';
import QuestsRepository from '~/repositories/quests';

@bind()
@injectable()
export default class Storylines {
    constructor(
        @inject(PlayersRepository)
        private readonly playersRepository: PlayersRepository,

        @inject(CharacterEntityRepository)
        private readonly characterEntityRepository: CharacterEntityRepository,

        @inject(QuestsRepository)
        private readonly questsRepository: QuestsRepository,
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
    async startStoryline(key: SharedConstants.Storylines, { player: playerMp }: PLI) {
        const character = await this.playersRepository.getCharacter(playerMp);

        if (!character) {
            console.log(`character ${playerMp.getVariable(SharedConstants.PlayerVariables.CHARACTER_ID)} wasn't found.`);
            return;
        }

        return this.questsRepository.startStoryline(character, key);
    }
}
