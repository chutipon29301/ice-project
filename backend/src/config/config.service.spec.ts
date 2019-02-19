import { Test, TestingModule } from '@nestjs/testing';
import { restore } from 'sinon';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
    let service: ConfigService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConfigService],
        }).compile();
        service = module.get<ConfigService>(ConfigService);
    });

    afterEach(() => {
        restore();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it(`should successful return "MYSQL_DATABASE"`, () => {
        process.env.MYSQL_DATABASE = 'a';
        const result = service.mySQLDatabase;
        expect(result).toEqual('a');
        process.env.MYSQL_DATABASE = undefined;
    });

    it(`should successful return "MYSQL_USER"`, () => {
        process.env.MYSQL_USER = 'a';
        const result = service.mySQLUser;
        expect(result).toEqual('a');
        process.env.MYSQL_USER = undefined;
    });

    it(`should successful return "MYSQL_PASSWORD"`, () => {
        process.env.MYSQL_PASSWORD = 'a';
        const result = service.mySQLPassword;
        expect(result).toEqual('a');
        process.env.MYSQL_PASSWORD = undefined;
    });

    it(`should successful return "SERVER_URL"`, () => {
        process.env.SERVER_URL = 'a';
        const result = service.serverURL;
        expect(result).toEqual('a');
        process.env.SERVER_URL = undefined;
    });

    it(`should successful return "CHANNEL_ID"`, () => {
        process.env.CHANNEL_ID = 'a';
        const result = service.lineChannelID;
        expect(result).toEqual('a');
        process.env.CHANNEL_ID = undefined;
    });

    it(`should successful return "CHANNEL_SECRET"`, () => {
        process.env.CHANNEL_SECRET = 'a';
        const result = service.lineChannelSecret;
        expect(result).toEqual('a');
        process.env.CHANNEL_SECRET = undefined;
    });

    it(`should successful return "IOT_DEVICE_SECRET"`, () => {
        process.env.IOT_DEVICE_SECRET = 'a';
        const result = service.iotDeviceSecret;
        expect(result).toEqual('a');
        process.env.IOT_DEVICE_SECRET = undefined;
    });
});
