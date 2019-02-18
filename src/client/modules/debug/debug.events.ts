mp.events.add('fromBrowser.log', text => {
    mp.gui.chat.push('DEBUG: ' + text);
    mp.events.callRemote('log', text);
});
