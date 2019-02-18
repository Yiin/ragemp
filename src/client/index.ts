/// <reference node="ragemp-c">

import './vendors/fly.js';

import './modules/debug';
import './modules/auth';

mp.keys.bind(0x71, false, () => {
    const shouldShow = !mp.gui.cursor.visible;
    mp.gui.cursor.show(shouldShow, shouldShow);
});
