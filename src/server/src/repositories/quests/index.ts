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
        private readonly questStepRepository: CharacterQuestStepRepository,

        @inject(CharacterQuestStepCounterRepository)
        private readonly questStepCounterRepository: CharacterQuestStepCounterRepository,
    ) {}

    async startStoryline(character: Character, key: SharedConstants.Storylines) {
        const storyline = getStorylineByKey(key);

        if (!storyline) {
            return;
            // Storyline doesn't exist
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
    }

    async startQuest(storyline: CharacterStoryline, quest: Quest) {
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
        const taskEntity = await this.questStepRepository.save(
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
        const counterEntity = await this.questStepCounterRepository.save(
            CharacterQuestStepCounter.create({
                key: counter.key,

            })
        );

        return counterEntity;
    }
}
