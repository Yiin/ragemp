enum CharacterState {
    IN_VEHICLE,
};

type SceneDescriptor = {
    name: string;
    state?: CharacterState;
};

type Scenes = {
    [asd :string]: SceneDescriptor[];
};

const scenes: Scenes = {
    Auth: [
        { name: 'Auth' },
    ],
    CharacterSelection: [
        { name: 'CharacterSelection' },
    ],
    CharacterCreation: [
        { name: 'CharacterCreation' },
    ],
    Game: [
        { name: 'Location' },
        { name: 'Time' },
        {
            name: 'Speedometer',
            state: CharacterState.IN_VEHICLE,
        },
    ],
};
