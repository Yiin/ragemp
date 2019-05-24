import { Container } from 'inversify';
import chalk from 'chalk';

const container = new Container();
// Create new DI container

export const bind = () => target => {
    try {
        container.bind(target).to(target).inSingletonScope();
        console.log(chalk`[{blueBright ragemp}][{green Loaded}]`, target.name);
    } catch (e) {
        console.log(chalk`[{blueBright ragemp}][{red Module failed to load}]`, target.name);
    }
};

export const handleEvent = (eventName: string) => (
    target,
    propertyKey: string,
) => {
    setTimeout(async () => {
        try {
            const service = container.get(target.constructor);
            mp.events.add(eventName, async (...args) => {
                try {
                    await service[propertyKey](...args);
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (e) {
            console.log(chalk`[red Event failed to bind] ${eventName}`);
        }
    });
}

export default container;
