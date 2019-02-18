import { Container } from 'inversify';
import chalk from 'chalk';

const container = new Container();
// Create new DI container

export const bind = () => target => {
    try {
        container.bind(target).to(target);
        console.log(chalk`[{green Loaded}]`, target.name);
    } catch (e) {
        console.log(chalk`[{red Module failed to load}]`, target.name);
    }
};

export const handleEvent = eventName => (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    setTimeout(() => {
        try {
            const service = container.get(target.constructor);
            mp.events.add(eventName, service[propertyKey].bind(service));
        } catch (e) {
            console.log('[Event failed to bind]');
        }
    });
}

export default container;
