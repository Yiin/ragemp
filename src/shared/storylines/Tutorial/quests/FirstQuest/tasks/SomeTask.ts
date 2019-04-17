export const SomeTask: Task = {
    key: 'SOME_TASK',
    title: 'Some task',
    description: 'Go do something',
    counters: [
        {
            key: 'KITTEN',
            type: 'item',
            value: 'ITEM_KITTEN',
            doneAt: 4,
        },
        {
            key: 'VISIT_TEN_PLACES',
            type: 'manual',
            doneAt: 10,
        },
    ],

    // @handleEvent(TALK_WITH_NPC)
    // onTalk(player) {
    //     callServer(COMPLETE_QUEST, player);
    // }
};
