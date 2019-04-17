getNormalizedVector = function(vector) {
    mag = Math.sqrt(
        vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );
    vector.x = vector.x / mag;
    vector.y = vector.y / mag;
    vector.z = vector.z / mag;
    return vector;
};
getCrossProduct = function(v1, v2) {
    vector = new mp.Vector3(0, 0, 0);
    vector.x = v1.y * v2.z - v1.z * v2.y;
    vector.y = v1.z * v2.x - v1.x * v2.z;
    vector.z = v1.x * v2.y - v1.y * v2.x;
    return vector;
};
bindVirtualKeys = {
    F2: 0x71
};
bindASCIIKeys = {
    Q: 69,
    E: 81,
    LCtrl: 17,
    Shift: 16
};
isNoClip = false;
noClipCamera;
shiftModifier = false;
controlModifier = false;
localPlayer = mp.players.local;

mp.keys.bind(bindVirtualKeys.F2, true, function() {
    isNoClip = !isNoClip;
    mp.game.ui.displayRadar(!isNoClip);
    if (isNoClip) {
        startNoClip();
    } else {
        stopNoClip();
    }
});

function startNoClip() {
    mp.game.graphics.notify('NoClip ~g~activated');
    camPos = new mp.Vector3(
        localPlayer.position.x,
        localPlayer.position.y,
        localPlayer.position.z
    );
    camRot = mp.game.cam.getGameplayCamRot(2);
    noClipCamera = mp.cameras.new('default', camPos, camRot, 45);
    noClipCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    localPlayer.freezePosition(true);
    localPlayer.setInvincible(true);
    localPlayer.setVisible(false, false);
    localPlayer.setCollision(false, false);
}

function stopNoClip() {
    mp.game.graphics.notify('NoClip ~r~disabled');
    if (noClipCamera) {
        localPlayer.position = noClipCamera.getCoord();
        localPlayer.setHeading(noClipCamera.getRot(2).z);
        noClipCamera.destroy(true);
        noClipCamera = null;
    }
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    localPlayer.freezePosition(false);
    localPlayer.setInvincible(false);
    localPlayer.setVisible(true, false);
    localPlayer.setCollision(true, false);
}
mp.events.add('render', function() {
    if (!noClipCamera || mp.gui.cursor.visible) {
        return;
    }
    controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
    shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
    rot = noClipCamera.getRot(2);
    fastMult = 1;
    slowMult = 1;
    if (shiftModifier) {
        fastMult = 3;
    } else if (controlModifier) {
        slowMult = 0.5;
    }
    rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
    rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
    leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
    leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
    pos = noClipCamera.getCoord();
    rr = noClipCamera.getDirection();
    vector = new mp.Vector3(0, 0, 0);
    vector.x = rr.x * leftAxisY * fastMult * slowMult;
    vector.y = rr.y * leftAxisY * fastMult * slowMult;
    vector.z = rr.z * leftAxisY * fastMult * slowMult;
    upVector = new mp.Vector3(0, 0, 1);
    rightVector = getCrossProduct(
        getNormalizedVector(rr),
        getNormalizedVector(upVector)
    );
    rightVector.x *= leftAxisX * 0.5;
    rightVector.y *= leftAxisX * 0.5;
    rightVector.z *= leftAxisX * 0.5;
    upMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.Q)) {
        upMovement = 0.5;
    }
    downMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.E)) {
        downMovement = 0.5;
    }
    mp.players.local.position = new mp.Vector3(
        pos.x + vector.x + 1,
        pos.y + vector.y + 1,
        pos.z + vector.z + 1
    );
    mp.players.local.heading = rr.z;
    noClipCamera.setCoord(
        pos.x - vector.x + rightVector.x,
        pos.y - vector.y + rightVector.y,
        pos.z - vector.z + rightVector.z + upMovement - downMovement
    );
    noClipCamera.setRot(
        rot.x + rightAxisY * -5.0,
        0.0,
        rot.z + rightAxisX * -5.0,
        2
    );
});
