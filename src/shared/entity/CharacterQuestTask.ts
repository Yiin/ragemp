import {Entity, Column, OneToMany, DeepPartial, ManyToOne, Unique, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { CharacterQuest } from './CharacterQuest';
import { CharacterQuestTaskCounter } from './CharacterQuestTaskCounter';

@Entity('CharacterQuestTasks')
@Unique(['quest', 'key'])
export class CharacterQuestTask extends BaseEntity {
    static create(entity: DeepPartial<CharacterQuestTask>) {
        return super.create(entity) as CharacterQuestTask;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => CharacterQuest, quest => quest.availableSteps)
    quest: CharacterQuest;
    
    @OneToMany(type => CharacterQuestTaskCounter, counter => counter.questStep)
    counters: CharacterQuestTaskCounter[];

    @Column()
    key: string;

    @Column({ default: false })
    done: boolean;
}
