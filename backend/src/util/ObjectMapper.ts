import { pickBy } from 'lodash';

export function partialOf<T>(value: Partial<T>): Partial<T> {
    return pickBy(value, o => o !== undefined) as Partial<T>;
}
