import fs from 'fs';

mp.events.addCommand('car', (player, model) => {
    player.putIntoVehicle(
        mp.vehicles.new(model, player.position, {
            heading: player.heading,
        }),
        -1 // driver seat
    );
});

mp.events.addCommand('spawn', player => {
    player.spawn(player.position);
});

mp.events.addCommand('savepos', (player, name) => {
    try {
        const position = JSON.stringify({
            ...player.position,
            heading: player.heading,
        });

        fs.appendFileSync('./saved-positions.txt', `${name || ''}: ${position}\n`);
    } catch (e) {
        console.error(e);
    }
});

mp.events.addCommand('ui', (playerMp, ui) => {
    playerMp.call('ui', [ui]);
});

mp.events.addCommand('ped', (player, type, hash) => {
    player.call('ped.create', [type, hash]);
});
