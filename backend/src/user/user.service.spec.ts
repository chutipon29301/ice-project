import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import Users, { Role } from '../models/users.model';
import { LineAuthService } from '../line-auth/line-auth.service';
import { UsersRepository } from '../config';
import { fake, replace, restore } from 'sinon';
import { ConflictException } from '@nestjs/common';

describe('UserService', () => {
    let service: UserService;
    let usersRepository: typeof Users;
    let lineAuthService: LineAuthService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        service = module.get<UserService>(UserService);
        usersRepository = module.get<typeof Users>(UsersRepository);
        lineAuthService = module.get<LineAuthService>(LineAuthService);
    });

    afterEach(() => {
        restore();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(usersRepository).toBeDefined();
        expect(lineAuthService).toBeDefined();
    });

    it('should successful crate user', async () => {
        const fakeCreate = fake();
        replace(usersRepository, 'create', fakeCreate);
        await service.create('name', 'oAuthID');

        expect(fakeCreate.calledOnce).toBeTruthy();
        expect(fakeCreate.calledWith({
            name: 'name',
            oAuthID: 'oAuthID'
        })).toBeTruthy();
    });

    it('should throw an error when failed to create user error', async () => {
        const fakeCrate = fake.throws(new Error());
        replace(usersRepository, 'create', fakeCrate);

        expect(service.create('a', 'a')).rejects.toThrowError(ConflictException);
    });

    it('should list users in the database', async () => {
        const fakeReturnValue = ['a', 'b'];
        const fakeFindAll = fake.returns(fakeReturnValue);
        replace(usersRepository, 'findAll', fakeFindAll);

        const returnValue = await service.listAll();

        expect(fakeFindAll.calledOnce).toBeTruthy();
        expect(returnValue).toEqual(fakeReturnValue);
    });

    it('should edit user name in database with id', async () => {
        const fakeUpdate = fake();
        replace(usersRepository, 'update', fakeUpdate);

        await service.edit(1, { name: 'A', oAuthID: undefined });

        expect(fakeUpdate.calledOnce).toBeTruthy();
        expect(fakeUpdate.calledWith({ name: 'A' }, { where: { id: 1 } })).toBeTruthy();
    });

    it('should delete user in the database wit id', async () => {
        const fakeDestroy = fake();
        replace(usersRepository, 'destroy', fakeDestroy);

        await service.delete(1);

        expect(fakeDestroy.calledOnce).toBeTruthy();
        expect(fakeDestroy.calledWith({ where: { id: 1 } })).toBeTruthy();
    });

    it('should be able to return generated link', () => {
        const fakeReturnValue = 'A';
        const fakeLineAuthPageURL = fake.returns(fakeReturnValue);
        replace(lineAuthService, 'lineAuthPageURL', fakeLineAuthPageURL);

        const link = service.redirectLink('a', Role.USER);

        expect(fakeLineAuthPageURL.calledOnce).toBeTruthy();
        expect(fakeLineAuthPageURL.calledWith('/user/register/callback', `{"name":"a","role":"${Role.USER}"}`)).toBeTruthy();
        expect(link).toEqual(fakeReturnValue);
    });

    it('should be able to register new user', () => {
        const fakeState = { name: 'A', role: Role.USER };
        const fakeDecodeToken = { sub: 'lineID' };
        const fakeUser = {name: 'A'};

        const fakeGetAccessToken = fake.returns({ state: fakeState });
        const fakeDecode = fake();
        const fakeGetUserFromLineID = fake();
        const fakeCrate = fake();
        replace(lineAuthService, 'getAccessToken', fakeGetAccessToken);
        replace(lineAuthService, 'decode', fakeDecode);
        replace(usersRepository, 'getUserFromLineID', fakeGetUserFromLineID);
        replace(usersRepository, 'create', fakeCrate);

    });

});
