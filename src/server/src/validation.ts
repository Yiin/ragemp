import validator from 'validator';
import container from './container';
import { interfaces } from 'inversify';

type ValidationFunction = (string) => Promise<string | null> | string | null;
interface Validators {
    [field: string]: ValidationFunction[],
};

export const ValidationError = (field, message) => ({
    [field]: message,
});

export const validate = async (values, validators: Validators) => {
    const errors = {};

    for (const [field, rules] of Object.entries(validators)) {
        for (const rule of rules) {
            const error = await rule(values[field]);

            if (error) {
                errors[field] = error;
                break;
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        throw errors;
    }
}

export const isRequired = (message: string): ValidationFunction => {
    return (value: any) => {
        if (value === undefined || value === '') {
            return message;
        }
        return null;
    };
}

export const isUnique = (
    message: string,
    { repository, field }: {
        repository: interfaces.ServiceIdentifier<any>,
        field: string,
    },
): ValidationFunction => {
    return async (value: string) => {
        const existingItem = await container.get(repository).findOne({
            [field]: value,
        });
        if (existingItem) {
            return message;
        }
        return null;
    };
}

export const isEmail = (message: string): ValidationFunction => {
    return (value: string) => {
        if (!validator.isEmail(value)) {
            return message;
        }
        return null;
    };
}

export const exists = (
    message: string,
    { repository, field }: {
        repository: interfaces.ServiceIdentifier<any>,
        field: string,
    },
): ValidationFunction => {
    return async (value: string) => {
        const existingItem = await container.get(repository).findOne({
            [field]: value,
        });
        if (!existingItem) {
            return message;
        }
        return null;
    };
}
