export const FirstQuest = {
    key: 'FIRST_QUEST',
    title: 'First Quest',
    description: require('./description.md').default,
    tasks: Object.values(require('./tasks')) as Task[],
};
