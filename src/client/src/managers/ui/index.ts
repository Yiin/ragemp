export default new class UIManager {
    public browsers = Object.create(null);

    show(name) {
        this.hide(name);

        try {
            const indexFile = `package://UserInterface/${name}/index.html`;
            this.browsers[name] = mp.browsers.new(indexFile);
        } catch (e) {
            mp.gui.chat.push(`UI '${name}' doesn't exist.`);
        }
    }

    hide(name) {
        if (this.browsers[name]) {
            this.browsers[name].destroy();
        }
        delete this.browsers[name];
    }
}
