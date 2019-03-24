import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
    const channelSecret = 'secret';
    const channelID = 'id';
    const serverURL = 'url';
    let app: TestingModule;
    let appController: AuthController;
    let appService: AuthService;

    beforeAll(async () => {
        process.env.CHANNEL_SECRET = channelSecret;
        process.env.CHANNEL_ID = channelID;
        process.env.SERVER_URL = serverURL;
        app = await Test.createTestingModule({
            imports: [AuthModule],
        }).compile();
        appController = app.get<AuthController>(AuthController);
        appService = app.get<AuthService>(AuthService);
    });

    afterAll(() => {
        process.env.CHANNEL_SECRET = undefined;
        process.env.CHANNEL_ID = undefined;
        process.env.SERVER_URL = undefined;
    });

    it('should be defined', () => {
        expect(appController).toBeDefined();
    });
});
