import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LineAuthModule } from '../line-auth/line-auth.module';
import { LineAuthService } from '../line-auth/line-auth.service';
import { fake, restore, replace } from 'sinon';

describe('AuthService', () => {
    let service: AuthService;
    let lineAuthService: LineAuthService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [LineAuthModule],
            providers: [AuthService],
        }).compile();
        service = module.get<AuthService>(AuthService);
        lineAuthService = module.get<LineAuthService>(LineAuthService);
    });

    afterEach(() => {
        restore();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return line callback url', () => {
        const fakeLineAuthURL = 'a';
        const fakeLineAuthPageURL = fake.rejects(fakeLineAuthURL);

        replace(lineAuthService, 'lineAuthPageURL', fakeLineAuthPageURL);

        const result = service.getLineAuthenticationPageURL();

        expect(result).toEqual(fakeLineAuthURL);
        expect(fakeLineAuthPageURL.calledOnce).toBeTruthy();
    });
});
