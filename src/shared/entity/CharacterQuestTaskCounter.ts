import {Entity, Column, DeepPartial, ManyToOne, Unique, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { CharacterQuestTask } from './CharacterQuestTask';

@Entity('CharacterQuestTaskCounters')
@Unique(['questStep', 'key'])
export class CharacterQuestTaskCounter extends BaseEntity {
    static create(entity: DeepPartial<CharacterQuestTaskCounter>) {
        return super.create(entity) as CharacterQuestTaskCounter;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => CharacterQuestTask, quest => quest.counters)
    questStep: CharacterQuestTask;

    @Column()
    key: string;

    @Column({ default: 0 })
    value: number;

    @Column({ default: false })
    done: boolean;
}
