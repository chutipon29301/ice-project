import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { fake, replace, restore } from 'sinon';
import { JwtToken } from './dto/jwt-token.dto';

describe('JwtAuthService', () => {
    const channelSecret = 'secret';
    let service: JwtAuthService;
    let jwtService: JwtService;

    beforeAll(async () => {
        process.env.CHANNEL_SECRET = channelSecret;
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: async (configService: ConfigService) => ({
                        secretOrPrivateKey: configService.lineChannelSecret,
                    }),
                }),
            ],
            providers: [JwtAuthService],
        }).compile();
        service = module.get<JwtAuthService>(JwtAuthService);
        jwtService = module.get<JwtService>(JwtService);
    });

    afterEach(() => {
        restore();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should successfully decode token', async () => {
        const fakeEncodedToken = 'a';
        const fakeDecodedToken: JwtToken = { userID: 1 };
        const fakeDecode = fake.returns(fakeDecodedToken);

        replace(jwtService, 'decode', fakeDecode);

        const result = await service.decode(fakeEncodedToken);

        expect(result).toEqual(fakeDecodedToken);
        expect(fakeDecode.calledOnce).toBeTruthy();
        expect(fakeDecode.calledWith(fakeEncodedToken)).toBeTruthy();
    });
});
