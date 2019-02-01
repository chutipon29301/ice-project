import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database.module';
import { UserService } from './user.service';
import { userProviders } from './user.providers';

describe('User Controller', () => {
    let module: TestingModule;
    let controller: UserController;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [DatabaseModule],
            controllers: [UserController],
            providers: [UserService, ...userProviders],
        }).compile();
        controller = module.get<UserController>(UserController);
    });

    // beforeEach(async() => {
    //     for(let i)
    // });

    // afterEach(async() => {

    // });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
