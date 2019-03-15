import { AuthHeaderParserMiddleware } from './auth-header-parser.middleware';

describe('AuthHeaderParserMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthHeaderParserMiddleware()).toBeTruthy();
  });
});
