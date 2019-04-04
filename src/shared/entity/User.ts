import {Entity, PrimaryGeneratedColumn, Column, OneToMany, DeepPartial} from 'typeorm';

import { Character } from './Character';

@Entity('Users')
export class User {
    static create(entity: DeepPartial<User>) {
        const user = new User();
        for (const key in entity) {
            user[key] = entity[key];
        }
        return user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ default: null })
    password?: string;

    @Column()
    authToken: string;

    @Column()
    email: string;

    @OneToMany(type => Character, character => character.user)
    characters: Promise<Character[]>;
}
