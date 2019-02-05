import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database.module';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserModule } from './user.module';

describe('User Controller', () => {
    let module: TestingModule;
    let controller: UserController;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [UserModule],
            // controllers: [UserController],
            // providers: [UserService, ...userProviders],
        }).compile();
        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
