import { ui } from '../ui';

mp.events.add('fromBrowser.console', text => {
    const args = JSON.parse(text).join(', ');
    mp.gui.chat.push('DEBUG: ' + args);
    mp.events.callRemote('log', args);
});

mp.events.add('ui', name => {
    ui.show(name);
});

mp.events.add('ped.create', (type, modelHash) => {
    const id = mp.game.ped.createPed(
        26,
        0x192BDD4A,
        mp.players.local.position.x,
        mp.players.local.position.y,
        mp.players.local.position.z,
        mp.players.local.heading + 180,
        false,
        true,
    );

    mp.gui.chat.push(`Created PED with id ${id}`);
});
