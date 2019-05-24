import bcrypt from 'bcryptjs';
import { inject, injectable } from 'inversify';
import token from 'token';

import { AuthConstants } from 'Shared/constants/auth';
import { User } from 'Shared/entity';

import { bind, handleEvent } from '~/container';
import { RPC } from '~/rpc';
import {
    ValidationError,
    exists,
    isEmail,
    isRequired,
    isUnique,
    validate,
} from '~/validation';

import { UserEntityRepository } from '~/repositories/player/bindings';
import { ServerConstants } from '~/constants/server';
import { GameConstants } from '~/constants/game';

@bind()
@injectable()
export default class AuthScene {
    constructor(
        @inject(UserEntityRepository)
        private readonly userEntityRepository: UserEntityRepository,
    ) {}

    @handleEvent(GameConstants.Events.PLAYER_READY)
    onPlayerReady(playerMp: PlayerMp) {
        console.log('calling serverReady');
        playerMp.call('serverReady');
    }

    @handleEvent('playerInitiated')
    /**
     * Player is ready to play, ask him to authenticate himself.
     */
    authenticatePlayer(playerMp: PlayerMp) {
        playerMp.call(AuthConstants.Events.PLAYER_READY_FOR_AUTHENTICATION);
    }

    @RPC(AuthConstants.RPC.SUBMIT_REGISTRATION_FORM)
    /**
     * Player is submiting his registration form. Validate it and create
     * new user if everything's alright.
     */
    async handleRegistration(formValues: RegistrationFormValues, { player }: PLI) {
        await validate(formValues, {
            username: [
                isRequired('Please enter your username'),
                isUnique('This username is already taken', {
                    repository: UserEntityRepository,
                    field: 'username'
                }),
            ],
            password: [
                isRequired('Password can not be empty.'),
            ],
            email: [
                isRequired('Please enter your email'),
                isEmail('Please enter correct email'),
                isUnique('User with this email is already registered', {
                    repository: UserEntityRepository,
                    field: 'email'
                }),
            ],
        });

        const { username, password, email } = formValues;

        try {
            const user = await this.userEntityRepository.save(
                User.create({
                    username,
                    password: await bcrypt.hash(password, 10),
                    email,
                }),
            );

            player.setVariable('userId', user.id);
        } catch (e) {
            console.log(e);
        }
    }

    @RPC(AuthConstants.RPC.SUBMIT_LOGIN_FORM)
    /**
     * Player is trying to login using username & password combination.
     * Return token if user checked `remember me` checkbox.
     */
    async handleLogin(
        formValues: LoginFormValues,
        { player: playerMp }: PLI
    ): Promise<LoginResponse> {
        await validate(formValues, {
            username: [
                isRequired('Please enter your username'),
                exists('This username is not registered', {
                    repository: UserEntityRepository,
                    field: 'username'
                }),
            ],
            password: [
                isRequired('Please enter your password'),
            ],
        });

        const { username, password, remember } = formValues;
        const user = await this.userEntityRepository.findOne({ username }) as User;
        // `user` will never be undefined. Validation takes care of that.

        const passwordsMatch = await bcrypt.compare(password, user.password!);
        if (!passwordsMatch) {
            throw ValidationError('password', 'Invalid password');
        }

        mp.events.call(ServerConstants.Auth.Events.USER_LOGIN, playerMp, user);

        if (remember) {
        // Generate authentication token that will be used for login
        // when player joins the server next time.

            const data = (user.id + +new Date()).toString();
            const authToken = token.generate(data);

            this.userEntityRepository.update(user, { authToken });

            return { data, token: authToken };
        }
    }

    @RPC(AuthConstants.RPC.SUBMIT_AUTH_TOKEN)
    /**
     * Player is trying to authenticate using saved auth token.
     * Check if it's still valid.
     */
    async handleAuthToken(payload, { player: playerMp }: PLI): Promise<boolean> {
        const { token: authToken, data } = payload;
        const user = await this.userEntityRepository.findOne({ authToken });

        if (user && token.verify(data, authToken)) {
            mp.events.call(ServerConstants.Auth.Events.USER_LOGIN, playerMp, user);
            return true;
        }
        return false;
    }
}
