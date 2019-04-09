import { register } from 'rage-rpc';
import container from '~/container';
import { captureException } from '~/sentry';
import { log } from '~/debug';

export const handleRPC = eventName => (
    target,
    propertyKey: string,
) => {
    setTimeout(() => {
        const service = container.get(target.constructor);
        try {
            register(eventName, async (...args) => {
                try {
                    log(`RPC called: ${eventName}`);
                    return await service[propertyKey](...args);
                } catch (e) {
                    captureException(e);
                }
            });
        } catch (e) {
            captureException(e);
        }
    }, 0);
}
