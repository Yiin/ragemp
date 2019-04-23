import { GameConstants } from '~/constants/game';
import UIManager from '~/managers/ui';

let visible = false;

mp.keys.bind(GameConstants.VK.O, false, async () => {
    if (visible) {
        UIManager.hide('Storylines');
    } else {
        UIManager.show('Storylines');
    }
    visible = !visible;
    mp.gui.chat.push(`Storylines are now ${visible ? 'visible' : 'hidden'}`);
});
