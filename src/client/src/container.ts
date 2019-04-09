import { Container } from 'inversify';
import { captureException } from './sentry';
import { log } from './debug';

const container = new Container();
// Create new DI container

export const containerPromises: Promise<any>[] = [];

export const bind = () => target => {
    mp.gui.chat.push(`binding ${target.name}`);
    containerPromises.push(
        new Promise<any>((resolve, reject) => {
            try {
                container.bind(target).to(target)
                    .inSingletonScope()
                    .onActivation((ctx, service) => {
                        mp.gui.chat.push(`${service.constructor.name} activated`);
                        resolve();
                        return service;
                    });
            } catch (e) {
                reject();
                captureException(e);
            }
        })
    );
};

export default container;
