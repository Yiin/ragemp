import container from '~/container';
import { captureException } from '~/sentry';
import { log } from '~/debug';

export const handleEvent = (eventName: string) => (
    target,
    propertyKey: string,
) => {
    setTimeout(async () => {
        try {
            const service = container.get(target.constructor);

            mp.events.add(eventName, async (...args) => {   
                try {
                    log(`Event called: ${eventName}`);
                    await service[propertyKey](...args);
                } catch (e) {
                    captureException(e);
                }
            });
        } catch (e) {
            captureException(e);
        }
    }, 0);
}
