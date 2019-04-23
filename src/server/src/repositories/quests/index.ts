import { injectable, inject } from 'inversify';
import { bind } from '~/container';
import { CharacterStorylineRepository, CharacterQuestRepository, CharacterQuestStepRepository, CharacterQuestStepCounterRepository } from './bindings';
import { getStorylineByKey } from 'Shared/storylines';
import { SharedConstants } from 'Shared/constants';
import { Character, CharacterStoryline, CharacterQuest, CharacterQuestStepCounter } from 'Shared/entity';
import { CharacterQuestTask } from 'Shared/entity/CharacterQuestTask';

@bind()
@injectable()
export default class QuestsRepository {
    constructor(
        @inject(CharacterStorylineRepository)
        private readonly storylineRepository: CharacterStorylineRepository,

        @inject(CharacterQuestRepository)
        private readonly questRepository: CharacterQuestRepository,

        @inject(CharacterQuestStepRepository)
        private readonly questTaskRepository: CharacterQuestStepRepository,

        @inject(CharacterQuestStepCounterRepository)
        private readonly questTaskCounterRepository: CharacterQuestStepCounterRepository,
    ) {}

    async startStoryline(character: Character, key: SharedConstants.Storylines) {
        const storyline = getStorylineByKey(key);

        if (!storyline) {
            console.log(`Storyline ${key} doesn't exist`);
            return false;
            // Storyline doesn't exist
        }

        const existingStoryline = await this.storylineRepository.findOne({
            character,
            key,
        });

        if (existingStoryline) {
            return false;
            // Storyline already started
        }

        // Start the storyline
        const storylineEntity = await this.storylineRepository.save(
            CharacterStoryline.create({
                key,
                character,
            })
        );

        // Start first quest in this storyline
        const quests = storyline.quests;

        await this.startQuest(
            storylineEntity,
            quests[0],
        );

        return true;
    }

    async startQuest(storyline: CharacterStoryline, quest: Quest) {
        const existingQuest = await this.questRepository.findOne({
            storyline,
            key: quest.key,
        });

        if (existingQuest) {
            return false;
            // Quest already started
        }

        const questEntity = await this.questRepository.save(
            CharacterQuest.create({
                key: quest.key,
                storyline,
            })
        );

        // Start all tasks for this quest
        for (const task of quest.tasks) {
            await this.startTask(questEntity, task);
        }

        return questEntity;
    }
    
    async startTask(quest: CharacterQuest, task: Task) {
        const existingTask = await this.questTaskRepository.findOne({
            quest,
            key: task.key,
        });

        if (existingTask) {
            return false;
            // Quest already started
        }

        const taskEntity = await this.questTaskRepository.save(
            CharacterQuestTask.create({
                key: task.key,
                quest,
            })
        );

        // Initiate counters if we need any
        for (const counter of task.counters) {
            await this.startCounter(taskEntity, counter);
        }

        return taskEntity;
    }

    async startCounter(task: CharacterQuestTask, counter: TaskCounter) {
        const existingTask = await this.questTaskCounterRepository.findOne({
            task,
            key: counter.key,
        });

        if (existingTask) {
            return false;
            // Quest already started
        }

        const counterEntity = await this.questTaskCounterRepository.save(
            CharacterQuestStepCounter.create({
                task,
                key: counter.key,
                value: 0,
            })
        );

        return counterEntity;
    }
}
