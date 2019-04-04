import { register } from 'rage-rpc';
import container from './container';

export const RPC = eventName => (
    target,
    propertyKey: string,
) => {
    setTimeout(() => {
        const service = container.get(target.constructor);
        try {
            console.log('registering', eventName);
            register(eventName, async (...args) => {
                try {
                    return await service[propertyKey](...args);
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            });
        } catch (e) {
            console.log('[Event failed to bind]');
            console.log(e);
        }
    });
}
