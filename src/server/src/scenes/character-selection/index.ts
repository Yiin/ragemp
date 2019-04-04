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
}
