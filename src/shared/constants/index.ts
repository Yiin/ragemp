import { SentryConstants } from './sentry';
import { AuthConstants } from './auth';
import { CharacterCreationConstants } from './character-creation';
import { CharacterSelectionConstants } from './character-selection';
import { UserConstants } from './user';
import { GameConstants } from './game';
import { PlayerVariables as _PlayerVariables } from './player-variables';

export namespace SharedConstants {
    export import Sentry = SentryConstants;
    export import Auth = AuthConstants;
    export import CharacterCreation = CharacterCreationConstants;
    export import CharacterSelection = CharacterSelectionConstants;
    export import User = UserConstants;
    export import Game = GameConstants;
    export import PlayerVariables = _PlayerVariables;
}
