import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LineAuthModule } from '../line-auth/line-auth.module';
import { LineAuthService } from '../line-auth/line-auth.service';
import { fake, restore, replace } from 'sinon';

describe('AuthService', () => {
    const channelSecret = 'secret';
    const channelID = 'id';
    const serverURL = 'url';
    let service: AuthService;
    let lineAuthService: LineAuthService;

    beforeAll(async () => {
        process.env.CHANNEL_SECRET = channelSecret;
        process.env.CHANNEL_ID = channelID;
        process.env.SERVER_URL = serverURL;
        const module: TestingModule = await Test.createTestingModule({
            imports: [LineAuthModule],
            providers: [AuthService],
        }).compile();
        service = module.get<AuthService>(AuthService);
        lineAuthService = module.get<LineAuthService>(LineAuthService);
    });

    afterAll(() => {
        process.env.CHANNEL_SECRET = undefined;
        process.env.CHANNEL_ID = undefined;
        process.env.SERVER_URL = undefined;
    });

    afterEach(() => {
        restore();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return line callback url', () => {
        const fakeLineAuthURL = 'a';
        const fakeLineAuthPageURL = fake.returns(fakeLineAuthURL);

        replace(lineAuthService, 'lineAuthPageURL', fakeLineAuthPageURL);

        const result = service.getLineAuthenticationPageURL();

        expect(result).toEqual(fakeLineAuthURL);
        expect(fakeLineAuthPageURL.calledOnce).toBeTruthy();
    });
});
