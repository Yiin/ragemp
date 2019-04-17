export class BaseEntity {
    static create(entity) {
        const quest = new this();
        for (const key in entity) {
            quest[key] = entity[key];
        }
        return quest;
    }
}
