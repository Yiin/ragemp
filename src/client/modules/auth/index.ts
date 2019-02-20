import { ui } from '../ui';

mp.events.add('showScene.auth', () => {
    ui.show('Auth');
});

mp.events.add('fromBrowser.handleRegistration', (username: string, password: string, email: string) => {
    mp.events.callRemote('playerRegistration', username, password, email);
});

mp.events.add('fromBrowser.handleLogin', (username: string, password: string) => {
    mp.events.callRemote('playerLogin', username, password);
});

mp.events.add('auth.response', (status: string, payload: string) => {
    if (status === 'success') {
        switch (payload) {
            case 'login':
                ui.hide();
                mp.game.graphics.notify('~b~Welcome back!');
                break;

            case 'registration':
                ui.dispatch('set-scene', 'login');
                mp.game.graphics.notify('~g~Registration was successful!');
                break;
        }
    } else {
        ui.dispatch('validation', payload);
        const result = /:(.+)/.exec(payload);

        if (result) {
            const error = result[1];
            mp.game.graphics.notify(`~r~${error}!`);
        } else {
            mp.game.graphics.notify(`~r~Unknown error: ${payload}`);
        }
    }
});
