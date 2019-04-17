import { Repository, getRepository } from 'typeorm';
import {
    CharacterStoryline,
    CharacterQuest,
    CharacterQuestStep,
    CharacterQuestStepCounter,
} from 'Shared/entity';
import container from '~/container';

export class CharacterStorylineRepository extends Repository<CharacterStoryline> {}
export class CharacterQuestRepository extends Repository<CharacterQuest> {}
export class CharacterQuestStepRepository extends Repository<CharacterQuestStep> {}
export class CharacterQuestStepCounterRepository
    extends Repository<CharacterQuestStepCounter> {}

container.bind<Repository<CharacterStoryline>>(CharacterStorylineRepository)
    .toDynamicValue(() => getRepository(CharacterStoryline))
    .inRequestScope();

container.bind<Repository<CharacterQuest>>(CharacterQuestRepository)
    .toDynamicValue(() => getRepository(CharacterQuest))
    .inRequestScope();

container.bind<Repository<CharacterQuestStep>>(CharacterQuestStepRepository)
    .toDynamicValue(() => getRepository(CharacterQuestStep))
    .inRequestScope();

container.bind<Repository<CharacterQuestStepCounter>>(CharacterQuestStepCounterRepository)
    .toDynamicValue(() => getRepository(CharacterQuestStepCounter))
    .inRequestScope();
