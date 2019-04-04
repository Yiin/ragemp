import { SentryConstants } from './sentry';
import { AuthConstants } from './auth';
import { CharacterCreationConstants } from './character-creation';
import { UserConstants } from './user';

export namespace SharedConstants {
    export import Sentry = SentryConstants;
    export import Auth = AuthConstants;
    export import CharacterCreation = CharacterCreationConstants;
    export import User = UserConstants;
}
