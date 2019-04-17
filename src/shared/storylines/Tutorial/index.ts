const TutorialStoryline = {
    title: 'Tutorial',
    description: require('./description.md').default,
    quests: Object.values(require('./quests')) as Quest[],
};

export default TutorialStoryline;
