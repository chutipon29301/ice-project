import { HttpModule, HttpService, UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { fake, replace, restore } from 'sinon';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CryptoModule } from '../crypto/crypto.module';
import { CryptoService } from '../crypto/crypto.service';
import { LineAuthService } from './line-auth.service';

describe('LineAuthService', () => {
    const channelSecret = 'secret';
    const channelID = 'id';
    const serverURL = 'url';
    let service: LineAuthService;
    let jwtService: JwtService;
    let httpService: HttpService;
    let cryptoService: CryptoService;

    beforeAll(async () => {
        process.env.CHANNEL_SECRET = channelSecret;
        process.env.CHANNEL_ID = channelID;
        process.env.SERVER_URL = serverURL;
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: async (configService: ConfigService) => ({
                        secretOrPrivateKey: configService.lineChannelSecret,
                        signOptions: {
                            algorithm: 'HS256',
                            audience: configService.lineChannelID,
                            issuer: 'https://access.line.me',
                        },
                    }),
                }),
                HttpModule,
                CryptoModule,
            ],
            providers: [LineAuthService],
            exports: [LineAuthService],
        }).compile();

        service = module.get<LineAuthService>(LineAuthService);
        jwtService = module.get<JwtService>(JwtService);
        httpService = module.get<HttpService>(HttpService);
        cryptoService = module.get<CryptoService>(CryptoService);
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

    it('should successful decode token', () => {
        const fakeToken = {
            iss: 'a',
            sub: 'b',
            aud: 'c',
            exp: 1,
            iat: 2,
            name: 'd',
            picture: 'e',
            email: 'f',
        };
        const fakeDecode = fake.returns(fakeToken);

        replace(jwtService, 'decode', fakeDecode);

        const result = service.decode('a');

        expect(fakeDecode.calledOnce).toBeTruthy();
        expect(fakeDecode.calledWith('a')).toBeTruthy();
        expect(result).toEqual(fakeToken);
    });

    it('should throw UnauthorizedException error', () => {
        const fakeDecode = fake.throws(new Error());

        replace(jwtService, 'decode', fakeDecode);

        expect(service.decode).toThrow(UnauthorizedException);
    });
});
