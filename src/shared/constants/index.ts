import { SentryConstants } from './sentry';
import { AuthConstants } from './auth';
import { CharacterCreationConstants } from './character-creation';
import { CharacterSelectionConstants } from './character-selection';
import { UserConstants } from './user';
import { GameConstants } from './game';
import { PlayerVariables as _PlayerVariables } from './player-variables';
import { Storylines as _Storylines } from './storylines';

export const SharedConstants = {
    Sentry: SentryConstants,
    Auth: AuthConstants,
    CharacterCreation: CharacterCreationConstants,
    CharacterSelection: CharacterSelectionConstants,
    User: UserConstants,
    Game: GameConstants,
    PlayerVariables: _PlayerVariables,
    Storylines: _Storylines,
}
