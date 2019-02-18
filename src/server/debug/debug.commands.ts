import fs from 'fs';
import { getRepository } from 'typeorm';
import { Player } from '../entity';

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
    console.log('ui', ui);
    playerMp.call('ui', [ui]);
});
