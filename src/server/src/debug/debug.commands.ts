import fs from 'fs';
import { SharedConstants } from 'Shared/constants';

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

mp.events.addCommand('auth', (playerMp) => {
    playerMp.call(SharedConstants.Auth.Events.PLAYER_READY_FOR_AUTHENTICATION);
});

mp.events.addCommand('ped', (player, hash) => {
    player.call('ped.create', [hash]);
});

mp.events.addCommand('remove', (player, id) => {
    player.call('ped.remove', [id]);
});
