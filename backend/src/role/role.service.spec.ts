import { RoleModule } from './role.module';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';

describe('RoleService', () => {
    let service: RoleService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            // providers: [RoleService],
            imports: [RoleModule],
        }).compile();
        service = module.get<RoleService>(RoleService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
