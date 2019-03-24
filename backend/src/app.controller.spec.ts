import { Test, TestingModule } from '@nestjs/testing';
import { replaceGetter, restore } from 'sinon';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let app: TestingModule;
    let appController: AppController;
    let appService: AppService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();
        appController = app.get<AppController>(AppController);
        appService = app.get<AppService>(AppService);
    });

    afterEach(() => {
        restore();
    });

    describe('root', () => {
        it('should be defined', () => {
            expect(appController).toBeDefined();
        });

        it('should call getPong function', () => {
            const fakePong = () => ({ msg: 'fake pong' });
            replaceGetter(appService, 'pong', fakePong);

            const result = appController.getPong();

            expect(result).toEqual(fakePong());
        });
    });
});
