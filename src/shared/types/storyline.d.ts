interface Storyline {
    title: string;
    description: string;
    quests: Quest[];
}

interface Quest {
    key: string;
    title: string;
    description: string;
    tasks: Task[];
}

interface Task {
    key: string;
    title: string;
    description: string;
    counters: TaskCounter[];
}

interface TaskCounter {
    key: string;
    type: string;
    value?: string;
    doneAt: number;
}
