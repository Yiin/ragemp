import bcrypt from 'bcryptjs';
import { injectable, inject } from 'inversify';
import { Repository } from 'typeorm';
import { User } from '../entity';
import { UserRepository } from '../player/player.bindings';
import { bind, handleEvent } from '../container';

@bind()
@injectable()
export default class AuthModule {
    static SPAWN_POSITION = {
        x: -1037.8544921875,
        y: -2737.84423828125,
        z: 20.16927146911621,
        heading: 322.68914794921875,
    };

    constructor(
        @inject(UserRepository) private readonly users: Repository<User>,
    ) {}

    @handleEvent('playerReady')
    async handleAuth(player: PlayerMp) {
        player.call('showScene.auth');
    }

    @handleEvent('playerRegistration')
    async handleRegistration(player: PlayerMp, username, password, email) {
        const existingUser = await this.users.findOne({
            username,
        });

        if (existingUser && existingUser.username === username) {
            return player.call('auth.response', [
                'error',
                'registration.username:Username is already taken.',
            ]);
        }

        const user = await this.users.save({
            username,
            password: await bcrypt.hash(password, 10),
            email,
        });

        try {
            player.setVariable('userId', user.id);
        } catch (e) {
            console.log(e);
        }

        player.call('auth.response', [
            'success',
            'registration',
            username,
        ]);
    }

    @handleEvent('playerLogin')
    async handleLogin(player: PlayerMp, username, password) {
        const user = await this.users.findOne({
            username,
        });

        if (!user) {
            return player.call('auth.response', [
                'error',
                'login.username:Username is not registered',
            ]);
        }

        const passwordsMatch = bcrypt.compare(password, user.password!);

        if (!passwordsMatch) {
            return player.call('auth.response', [
                'error',
                'login.password:Password does not match',
            ]);
        }

        player.call('auth.response', [
            'success',
            'login',
        ]);

        // mp.events.call('')
    }

    async login(player: PlayerMp) {
        // player.spawn(new mp.Vector3(player.x, player.y, player.z));
        // player.heading = player.heading;
        // player.data.id = player.id;
    }

    async register(player: PlayerMp) {        
        // const player = new Player();
        // player.name = player.name;
        
        // const { x, y, z, heading } = AuthModule.SPAWN_POSITION;
        // player.x = x;
        // player.y = y;
        // player.z = z;
        // player.heading = heading;
        
        // const { id } = await this.users.save(player);
        
        // player.data.id = id;
        
        // player.outputChatBox('Užsiregistravai sėkmingai');
        // player.spawn(new mp.Vector3(x, y, z));
    }
}
