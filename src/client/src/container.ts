import { Container } from 'inversify';
import { captureException } from './sentry';
import { log } from './debug';

const container = new Container();
// Create new DI container

export const containerPromises: Promise<any>[] = [];

export const bind = () => target => {
    containerPromises.push(
        new Promise<any>((resolve, reject) => {
            try {
                container.bind(target).to(target)
                    .inSingletonScope()
                    .onActivation((ctx, service) => {
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
