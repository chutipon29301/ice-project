import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User, Role, AuthenticationType, UserStatus } from '../entities/user.entity';
import { UserRepositoryToken } from 'src/constant';
import { fake, restore, replace } from 'sinon';

describe('UserService', () => {
    let service: UserService;
    let userRepository: Repository<User>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();
        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(UserRepositoryToken);
    });

    afterEach(() => {
        restore();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should successfully create user', async () => {
        const fakeNationalID = '1100400400339';
        const fakeFirstName = 'cherprang';
        const fakeLastName = 'areekul';
        const fakePhone = '0094332223';
        const fakeAuthenticationID = 'abcdefgh';
        const fakeSave = fake.returns('a');

        replace(userRepository, 'save', fakeSave);

        const result = await service.create(fakeNationalID, fakeFirstName, fakeLastName, fakePhone, fakeAuthenticationID);

        expect(result).toEqual('a');
        expect(fakeSave.calledOnce).toBeTruthy();
        expect(
            fakeSave.calledWith({
                nationalID: fakeNationalID,
                firstName: fakeFirstName,
                lastName: fakeLastName,
                role: Role.USER,
                authenticationID: fakeAuthenticationID,
                authenticationType: AuthenticationType.LINE,
                phone: fakePhone,
                status: UserStatus.ACTIVE,
            }),
        ).toBeTruthy();
    });

    it('should throw error when create user', async () => {
        const fakeNationalID = '1100400400339';
        const fakeFirstName = 'cherprang';
        const fakeLastName = 'areekul';
        const fakePhone = '0094332223';
        const fakeAuthenticationID = 'abcdefgh';
        const fakeSave = fake.returns('a');

        replace(userRepository, 'save', fakeSave);

        const result = await service.create(fakeNationalID, fakeFirstName, fakeLastName, fakePhone, fakeAuthenticationID);

        expect(result).toEqual('a');
        expect(fakeSave.calledOnce).toBeTruthy();
        expect(
            fakeSave.calledWith({
                nationalID: fakeNationalID,
                firstName: fakeFirstName,
                lastName: fakeLastName,
                role: Role.USER,
                authenticationID: fakeAuthenticationID,
                authenticationType: AuthenticationType.LINE,
                phone: fakePhone,
                status: UserStatus.ACTIVE,
            }),
        ).toBeTruthy();
    });

    it('should be created', async () => {
        const fakeNationalID = '1100400400339';
        const fakeFirstName = 'cherprang';
        const fakeLastName = 'areekul';
        const fakePhone = '0094332223';
        const fakeAuthenticationID = 'abcdefgh';
        const fakeSave = fake.returns('a');

        replace(userRepository, 'save', fakeSave);

        const result = await service.create(fakeNationalID, fakeFirstName, fakeLastName, fakePhone, fakeAuthenticationID);

        expect(result).toEqual('a');
        expect(fakeSave.calledOnce).toBeTruthy();
        expect(
            fakeSave.calledWith({
                nationalID: fakeNationalID,
                firstName: fakeFirstName,
                lastName: fakeLastName,
                role: Role.USER,
                authenticationID: fakeAuthenticationID,
                authenticationType: AuthenticationType.LINE,
                phone: fakePhone,
                status: UserStatus.ACTIVE,
            }),
        ).toBeTruthy();
    });
});
