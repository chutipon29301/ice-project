import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { GroupModule } from './group.module';

describe('GroupService', () => {
    let service: GroupService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [GroupModule],
        }).compile();
        service = module.get<GroupService>(GroupService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
