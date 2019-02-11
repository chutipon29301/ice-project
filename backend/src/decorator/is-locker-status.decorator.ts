import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import { LockerStatus } from '../models/locker.model';

export function IsLockerStatus(
    property?: string,
    validationOptions?: ValidationOptions,
) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'IsLockerStatus',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any[], args: ValidationArguments) {
                    for (const status of value) {
                        if (Object.keys(LockerStatus).indexOf(status) < 0) {
                            return false;
                        }
                    }
                    return true;
                },
            },
        });
    };
}
