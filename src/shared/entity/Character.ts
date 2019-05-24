import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    DeepPartial,
    OneToMany,
} from 'typeorm';

import { User } from './User';
import { BaseEntity } from './BaseEntity';
import { CharacterStoryline } from './CharacterStoryline';

@Entity('Characters')
export class Character extends BaseEntity {
    static create<Character>(entity: DeepPartial<Character>) {
        return super.createEntity(this, entity);
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => User, user => user.characters)
    user!: Promise<User>;

    @OneToMany(type => CharacterStoryline, storyline => storyline.character)
    storylines!: CharacterStoryline[];

    @Column()
    name!: string;

    @Column('text')
    appearance!: string;

    @Column('integer', { default: 0 })
    money!: number;

    @Column('float', { default: 0 })
    x!: number;

    @Column('float', { default: 0 })
    y!: number;

    @Column('float', { default: 0 })
    z!: number;

    @Column('float', { default: 0 })
    heading!: number;

    @Column('timestamp', {
        default: null,
        onUpdate: 'CURRENT_TIMESTAMP',
        transformer: {
            from(value: Date) {
                if (value) {
                    value.setTime(value.getTime() - value.getTimezoneOffset() * 6e4);
                    // Reset time from local to UTC
                }
                return value;
            },
            to(value: Date) {
                return value;
            }
        }
    })
    lastPlayed!: string;
}
