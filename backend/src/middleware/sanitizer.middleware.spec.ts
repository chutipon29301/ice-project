import { SanitizerMiddleware } from './sanitizer.middleware';

describe('SanitizerMiddleware', () => {
    it('should be defined', () => {
        expect(new SanitizerMiddleware()).toBeTruthy();
    });
});
