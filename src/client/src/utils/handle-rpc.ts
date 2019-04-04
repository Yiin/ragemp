import { register } from 'rage-rpc';
import container from '~/container';
import { captureException } from '~/sentry';

export const handleRPC = eventName => (
    target,
    propertyKey: string,
) => {
    setTimeout(() => {
        const service = container.get(target.constructor);
        try {
            register(eventName, async (...args) => {
                try {
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
