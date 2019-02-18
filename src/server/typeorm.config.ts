import * as Entities from './entity';
import { ConnectionOptions } from 'typeorm';

export const TYPE_ORM_CONFIG: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: Object.values(Entities),
    synchronize: true,
    logging: false
};
