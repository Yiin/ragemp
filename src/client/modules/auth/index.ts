import { ui } from '../ui';

mp.events.add('ui', name => {
    mp.gui.chat.push('Rodom ui: ' + name);

    ui.show(name);
});

mp.events.add('showScene.auth', () => {
    ui.show('Auth');
});

mp.events.add('fromBrowser.handleRegistration', (username, password, email) => {
    mp.events.callRemote('handleRegistration', username, password, email);
});

mp.events.add('auth.response', (status, data) => {
    if (status === 'success') {
        ui.browser.destroy();
        mp.game.graphics.notify('~g~Sėkmingai užsiregistravai!');
    } else {
        ui.browser.execute(`dispatch('validation', '${data}')`);
        mp.game.graphics.notify('~r~Validation error!');
    }
});
