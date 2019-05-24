import { DeepPartial } from 'typeorm';

export class BaseEntity {
    static createEntity<T extends BaseEntity>(
        entityClass: { new (...args: any[]): T },
        partialEntity: DeepPartial<T>,
    ) {
        const entity = new entityClass();
        for (const key in partialEntity) {
            entity[key] = partialEntity[key] as any;
        }
        return entity;
    }
}
