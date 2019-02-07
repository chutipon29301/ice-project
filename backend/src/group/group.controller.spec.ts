import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupModule } from './group.module';

describe('Group Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [GroupModule],
        }).compile();
    });
    it('should be defined', () => {
        const controller: GroupController = module.get<GroupController>(
            GroupController,
        );
        expect(controller).toBeDefined();
    });
});
