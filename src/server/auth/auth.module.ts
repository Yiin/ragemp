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

    @handleEvent('handleRegistration')
    async handleRegistration(player: PlayerMp, username, password, email) {
        console.log('handleRegistration', player.name, username, password, email);

        const existingPlayer = await this.users.findOne({
            username,
        });

        if (existingPlayer) {
            return player.call('auth.response', [
                'error',
                'registration.username:ALREADY_EXISTS',
            ]);
        }

        const user = await this.users.create({
            username,
            password: bcrypt.hashSync(password, 10),
            email,
        });
        player.data.userId = user.id;

        player.call('auth.response', [
            'success',
        ]);
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
