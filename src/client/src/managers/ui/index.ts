import { handleEvent } from '~/utils/handle-event';
import { GameConstants } from '~/constants/game';

export default new class UIManager {
    private browser;

    @handleEvent(GameConstants.Events.GUI_READY)
    init() {
        this.browser = mp.browsers.new('package://UserInterface/index.html');
    }

    // TODO: refactor
    setScene(sceneKey: string) {

    }

    showElement(elementKey: string) {
        this.b
    }

    show(name) {
        this.hide(name);

        try {
            const indexFile = `package://UserInterface/${name}/index.html`;
            this.browsers[name] = mp.browsers.new(indexFile);
        } catch {
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
