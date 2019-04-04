import { GameConstants } from '~/constants/game';

type Listener = (...args: any[]) => void;
type ListenerCreator = (unhook: () => void) => Listener;

/**
 * Should be used to temporary listen for the event.
 */
export function hookEvent(event: GameConstants.Events, getListener: ListenerCreator) {
    const unhook = () => {
        mp.events.remove(event, listener)
    };
    const listener = getListener(unhook);
    mp.events.add(event, listener);
};
