/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference node="ragemp-c">
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(25);
mp.keys.bind(0x71, false, function () {
    var shouldShow = !mp.gui.cursor.visible;
    mp.gui.cursor.show(shouldShow, shouldShow);
});


/***/ }),

/***/ 22:
/***/ (function(module, exports) {

const controlsIds = {
    F5: 327,
    W: 32, // 232
    S: 33, // 31, 219, 233, 268, 269
    A: 34, // 234
    D: 35, // 30, 218, 235, 266, 267
    Space: 321,
    LCtrl: 326,
    LShift: 21,
};

global.fly = {
    flying: false, f: 2.0, w: 2.0, h: 2.0, point_distance: 1000,
};
global.gameplayCam = mp.cameras.new('gameplay');

mp.game.graphics.notify('~r~Fly script loaded!');
mp.game.graphics.notify('~r~F5~w~ - enable/disable\n~r~F5+Space~w~ - disable without warping to ground\n~r~W/A/S/D/Space/LCtrl~w~ - move');
mp.game.graphics.notify('~r~/savecam~w~ - save Camera position.');

let direction = null;
let coords = null;

function pointingAt(distance) {
    const farAway = new mp.Vector3((direction.x * distance) + (coords.x), (direction.y * distance) + (coords.y), (direction.z * distance) + (coords.z));

    const result = mp.raycasting.testPointToPoint(coords, farAway, [1, 16]);
    if (result === undefined) {
        return 'undefined';
    }
    return result;
}

mp.events.add('render', () => {
    const controls = mp.game.controls;
    const fly = global.fly;
    direction = global.gameplayCam.getDirection();
    coords = global.gameplayCam.getCoord();

    mp.game.graphics.drawText(`Coords: ${JSON.stringify(coords)}`, [0.5, 0.005], {
        font: 0,
        color: [255, 255, 255, 185],
        scale: [0.3, 0.3],
        outline: true,
    });
    mp.game.graphics.drawText(`pointAtCoord: ${JSON.stringify(pointingAt(fly.point_distance).position)}`, [0.5, 0.025], {
        font: 0,
        color: [255, 255, 255, 185],
        scale: [0.3, 0.3],
        outline: true,
    });

    if (controls.isControlJustPressed(0, controlsIds.F5)) {
        fly.flying = !fly.flying;

        const player = mp.players.local;

        player.setInvincible(fly.flying);
        player.freezePosition(fly.flying);
        player.setAlpha(fly.flying ? 0 : 255);

        if (!fly.flying && !controls.isControlPressed(0, controlsIds.Space)) {
            const position = mp.players.local.position;
            position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }

        mp.game.graphics.notify(fly.flying ? 'Fly: ~g~Enabled' : 'Fly: ~r~Disabled');
    } else if (fly.flying) {
        let updated = false;
        const position = mp.players.local.position;
        const maxSpeed = controls.isControlPressed(0, controlsIds.LShift)
            ? 1.0
            : 8.0;

        if (controls.isControlPressed(0, controlsIds.W)) {
            if (fly.f < maxSpeed) { fly.f *= 1.025; }
            if (fly.f > maxSpeed) { fly.f *= 0.975; }

            position.x += direction.x * fly.f;
            position.y += direction.y * fly.f;
            position.z += direction.z * fly.f;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.S)) {
            if (fly.f < maxSpeed) { fly.f *= 1.025; }
            if (fly.f > maxSpeed) { fly.f *= 0.975; }

            position.x -= direction.x * fly.f;
            position.y -= direction.y * fly.f;
            position.z -= direction.z * fly.f;
            updated = true;
        } else {
            fly.f = maxSpeed / 4;
        }

        if (controls.isControlPressed(0, controlsIds.A)) {
            if (fly.l < maxSpeed) { fly.l *= 1.025; }
            if (fly.l > maxSpeed) { fly.l *= 0.975; }

            position.x += (-direction.y) * fly.l;
            position.y += direction.x * fly.l;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.D)) {
            if (fly.l < maxSpeed) { fly.l *= 1.025; }
            if (fly.l > maxSpeed) { fly.l *= 0.975; }

            position.x -= (-direction.y) * fly.l;
            position.y -= direction.x * fly.l;
            updated = true;
        } else {
            fly.l = maxSpeed / 4;
        }

        if (controls.isControlPressed(0, controlsIds.Space)) {
            if (fly.h < maxSpeed) { fly.h *= 1.025; }
            if (fly.h > maxSpeed) { fly.h *= 0.975; }

            position.z += fly.h;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.LCtrl)) {
            if (fly.h < maxSpeed) { fly.h *= 1.025; }
            if (fly.h > maxSpeed) { fly.h *= 0.975; }

            position.z -= fly.h;
            updated = true;
        } else {
            fly.h = maxSpeed / 4;
        }

        if (updated) {
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }
    }
});

mp.events.add('getCamCoords', (name) => {
    mp.events.callRemote('saveCamCoords', JSON.stringify(coords), JSON.stringify(pointingAt(fly.point_distance)), name);
});


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(24);


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = __webpack_require__(4);
mp.events.add('fromBrowser.console', function (text) {
    var args = JSON.parse(text).join(', ');
    mp.gui.chat.push('DEBUG: ' + args);
    mp.events.callRemote('log', args);
});
mp.events.add('ui', function (name) {
    ui_1.ui.show(name);
});


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = __webpack_require__(4);
mp.events.add('showScene.auth', function () {
    ui_1.ui.show('Auth');
});
mp.events.add('fromBrowser.handleRegistration', function (username, password, email) {
    mp.events.callRemote('playerRegistration', username, password, email);
});
mp.events.add('fromBrowser.handleLogin', function (username, password) {
    mp.events.callRemote('playerLogin', username, password);
});
mp.events.add('auth.response', function (status, payload) {
    if (status === 'success') {
        switch (payload) {
            case 'login':
                ui_1.ui.hide();
                mp.game.graphics.notify('~b~Welcome back!');
                break;
            case 'registration':
                ui_1.ui.dispatch('set-scene', 'login');
                mp.game.graphics.notify('~g~Registration was successful!');
                break;
        }
    }
    else {
        ui_1.ui.dispatch('validation', payload);
        var result = /:(.+)/.exec(payload);
        if (result) {
            var error = result[1];
            mp.game.graphics.notify("~r~" + error + "!");
        }
        else {
            mp.game.graphics.notify("~r~Unknown error: " + payload);
        }
    }
});


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UIManager = /** @class */ (function () {
    function UIManager() {
    }
    UIManager.prototype.show = function (name) {
        var indexFile = "package://UserInterface/" + name + "/index.html";
        if (!this.browser) {
            try {
                this.browser = mp.browsers.new(indexFile);
            }
            catch (e) {
                mp.gui.chat.push("UI '" + name + "' doesn't exist.");
            }
        }
        else {
            this.browser.url = indexFile;
        }
        mp.gui.cursor.show(true, true);
    };
    UIManager.prototype.hide = function () {
        this.browser.destroy();
        this.browser = null;
        mp.gui.cursor.show(false, false);
    };
    UIManager.prototype.dispatch = function (eventType, payload) {
        if (!this.browser) {
            mp.gui.chat.push('no browser, rip');
            return;
        }
        this.browser.execute("window.dispatch('" + eventType + "', '" + payload + "');");
    };
    return UIManager;
}());
exports.ui = new UIManager();


/***/ })

/******/ });
//# sourceMappingURL=index.js.map