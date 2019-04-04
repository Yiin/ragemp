import UIManager from '~/managers/ui';

mp.events.add('ui', name => {
    UIManager.show(name);
});

mp.events.add('ped.create', model => {
    const {
        position,
        dimension,
    } = mp.players.local;

    const ped = mp.peds.new(
        mp.game.joaat(model),
        position,
        mp.players.local.getHeading(),
        () => {
            mp.gui.chat.push(`PED with id ${ped.id} was streamed in`);
        },
        dimension,
    );

    mp.gui.chat.push(`Created PED with id ${ped.id}`);
});

mp.events.add('ped.remove', (idToRemove: string) => {
    const ped = mp.peds.toArray().find(({ id }) => id === +idToRemove);
    
    if (ped) {
        ped.destroy();
    }
        
    mp.gui.chat.push(`Removed ped with id ${idToRemove}... probably`);
});

mp.keys.bind(0x71, false, () => {
    const shouldShow = !mp.gui.cursor.visible;
    mp.gui.cursor.show(shouldShow, shouldShow);
});
