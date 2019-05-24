import { injectable, inject } from 'inversify';

import { SharedConstants } from 'Shared/constants';
import { Character } from 'Shared/entity';

import { bind } from '~/container';
import { RPC } from '~/rpc';
import { validate, isRequired } from '~/validation';
import PlayersRepository from '~/repositories/player';
import { CharacterEntityRepository } from '~/repositories/player/bindings';

@bind()
@injectable()
export default class CharacterSelectionModule {
    constructor(
        @inject(CharacterEntityRepository)
        private readonly characterEntityRepository: CharacterEntityRepository,

        @inject(PlayersRepository)
        private readonly playersRepository: PlayersRepository,
    ) {}

    @RPC(SharedConstants.CharacterCreation.RPC.CREATE_CHARACTER)
    async createCharacter(data: CharacterAppearance, { player: playerMp }: PLI) {
        const NAME_REGEX: RegExp = /^\s*([A-Za-z]{3,}) ([A-Za-z]{3,})\s*$/;

        await validate(data, {
            name: [
                isRequired('Please name your character'),
                (value: string) => NAME_REGEX.test(value)
                    ? null
                    : '<first name> <last name> (both at least 3 letters)',
            ],
        });

        const { name, ...appearance } = data;
        const user = this.playersRepository.getUser(playerMp);

        await this.characterEntityRepository.save(
            Character.create({
                user,
                name: name
                    .trim()
                    .toLocaleLowerCase()
                    .replace(/\b\w/g, l => l.toLocaleUpperCase()),
                    // Capitalize first and last name
                appearance: JSON.stringify(appearance),
            }),
        );
    }

    @RPC(SharedConstants.CharacterSelection.RPC.START_GAME)
    async startGame(characterId: number, { player: playerMp }: PLI) {
        const user = await this.playersRepository.getUser(playerMp);

        if (!user) {
            console.log(`User wasn't found`);
            return;
        }
        
        const character = (await user.characters)
            .find(character => character.id === characterId);
        
        if (!character) {
            console.log(`Character wasn't found`);
            return;
        }

        playerMp.setVariable(SharedConstants.PlayerVariables.CHARACTER_ID, characterId);

        if (!character.x && !character.y && !character.z) {
            Object.assign(character, {
                x: 155,
                y: 6634.86,
                z: 31.62,
                heading: 88.9
            });
        }
        playerMp.spawn(new mp.Vector3(character.x, character.y, character.z));
        playerMp.call(SharedConstants.Game.Events.GAME_STARTED);
    }
}
