import {Entity, Column, OneToMany, DeepPartial, ManyToOne, Unique, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { CharacterStoryline } from './CharacterStoryline';
import { CharacterQuestTask } from './CharacterQuestTask';

@Entity('CharacterQuests')
@Unique(['storyline', 'key'])
export class CharacterQuest extends BaseEntity {
    static create(entity: DeepPartial<CharacterQuest>) {
        return super.create(entity) as CharacterQuest;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => CharacterStoryline, character => character.quests)
    storyline: CharacterStoryline;

    @OneToMany(type => CharacterQuestTask, step => step.quest)
    availableSteps: CharacterQuestTask[];

    @Column()
    key: string;

    @Column({ default: false })
    done: boolean;
}
