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
}

export const ui = new UIManager();
