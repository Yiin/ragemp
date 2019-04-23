import {Entity, PrimaryGeneratedColumn, Column, OneToMany, DeepPartial} from 'typeorm';

import { Character } from './Character';
import { BaseEntity } from './BaseEntity';

@Entity('Users')
export class User extends BaseEntity {
    static create(entity: DeepPartial<User>) {
        return super.create(entity) as User;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ default: null })
    password?: string;

    @Column({ nullable: true })
    authToken: string;

    @Column()
    email: string;

    @OneToMany(type => Character, character => character.user)
    characters: Promise<Character[]>;
}
