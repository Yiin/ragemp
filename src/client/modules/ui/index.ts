class UIManager {
    public browser;

    show(name) {
        const indexFile = `package://UserInterface/${name}/index.html`;

        if (!this.browser) {
            try {
                this.browser = mp.browsers.new(indexFile);
            } catch (e) {
                mp.gui.chat.push(`UI '${name}' doesn't exist.`);
            }
        } else {
            this.browser.url = indexFile;
        }
        mp.gui.cursor.show(true, true);
    }

    hide() {
        this.browser.destroy();
        this.browser = null;
        mp.gui.cursor.show(false, false);
    }

    dispatch(eventType: string, payload: string) {
        if (!this.browser) {
            mp.gui.chat.push('no browser, rip');
            return;
        }
        this.browser.execute(`window.dispatch('${eventType}', '${payload}');`);
    }
}

export const ui = new UIManager();
