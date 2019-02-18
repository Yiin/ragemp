import { Repository, getRepository } from 'typeorm';
import { User } from '../entity';
import container from '../container';

export class UserRepository extends Repository<User> {}

container.bind<Repository<User>>(UserRepository)
    .toDynamicValue(() => getRepository(User))
    .inRequestScope();
