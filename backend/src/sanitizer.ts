import {
    Sanitize,
    SanitizerConstraint,
    SanitizerInterface,
} from 'class-sanitizer';

export const ToDateFromTimestamp = () => Sanitize(ToDateFromTimestampSanitizer);

@SanitizerConstraint()
class ToDateFromTimestampSanitizer implements SanitizerInterface {
    sanitize(text: string): Date | null {
        const val = parseInt(text, 10);
        if (isNaN(val)) {
            // throw new BadRequestException('Validation failed');
            return null;
        }
        const timestamp = val * 1000;
        const date = new Date(timestamp);
        return isValidDate(date) ? date : null;
    }
}

function isValidDate(date: any): date is Date {
    return date instanceof Date && !isNaN(date as any);
}
