import { Test, TestingModule } from '@nestjs/testing';
import { fake } from 'sinon';
import { UsersRepository } from 'src/config';
import { UserController } from './user.controller';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('User Controller', () => {
    let module: TestingModule;
    let controller: UserController;
    const fakeUserRepository = fake();
    const fakeUserService = fake();

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [UserModule]
        }).overrideProvider(UsersRepository).useValue(fakeUserRepository)
        .overrideProvider(UserService).useValue(fakeUserService)
        .compile();
        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

});
