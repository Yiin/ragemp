import {Entity, Column, OneToMany, DeepPartial, ManyToOne, Unique, PrimaryGeneratedColumn } from 'typeorm';

import { SharedConstants } from 'Shared/constants';

import { BaseEntity } from './BaseEntity';
import { Character } from './Character';
import { CharacterQuest } from './CharacterQuest';

@Entity('CharacterStorylines')
@Unique(['character', 'key'])
export class CharacterStoryline extends BaseEntity {
    static create(entity: DeepPartial<CharacterStoryline>) {
        return super.create(entity) as CharacterStoryline;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Character, character => character.storylines)
    character: Character;

    @OneToMany(type => CharacterQuest, quest => quest.storyline)
    quests: CharacterQuest[];

    @Column({ type: 'varchar' })
    key: SharedConstants.Storylines;

    @Column({ default: false })
    done: boolean;
}
