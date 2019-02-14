import { SanitizerInterface, SanitizerConstraint } from 'class-sanitizer';

@SanitizerConstraint()
export class ToArraySanitizer implements SanitizerInterface {
    sanitize(text: string): string[] {
        return text ? text.split(' ') : [];
    }
}
