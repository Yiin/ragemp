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
        const NAME_REGEX: RegExp = /^([A-Za-z]{3,}) ([A-Za-z]{3,})$/;

        await validate(data, {
            name: [
                isRequired('Please name your character'),
                (value: string) => NAME_REGEX.test(value)
                    ? null
                    : `This name doesn't look right`,
            ],
        });

        const { name, ...appearance } = data;
        const user = this.playersRepository.getUser(playerMp);

        console.log(await user);

        await this.characterEntityRepository.save(
            Character.create({
                user,
                name: name
                    .toLocaleLowerCase()
                    .replace(/\b\w/g, l => l.toLocaleUpperCase()),
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
