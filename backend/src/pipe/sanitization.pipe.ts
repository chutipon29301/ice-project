import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { sanitize } from 'class-sanitizer';
import {
    classToPlain,
    ClassTransformOptions,
    plainToClass,
} from 'class-transformer';

@Injectable()
export class SanitizationPipe implements PipeTransform<any> {
    // https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts
    protected isTransformEnabled?: boolean;
    protected transformOptions?: ClassTransformOptions;

    constructor(
        options: {
            transform?: boolean;
            transformOptions?: ClassTransformOptions;
        } = {},
    ) {
        const { transform, transformOptions } = options;
        this.isTransformEnabled = !!transform;
        this.transformOptions = transformOptions;
    }

    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toSanitizer(metatype)) {
            return value;
        }
        const entity = plainToClass(metatype, value);
        sanitize(entity);
        return this.isTransformEnabled
            ? entity
            : classToPlain(entity, this.transformOptions);
    }

    private toSanitizer(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
