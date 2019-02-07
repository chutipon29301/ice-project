import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { RoleModule } from './role.module';

describe('RoleService', () => {
    let service: RoleService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [RoleModule],
            // providers: [RoleService],
        }).compile();
        service = module.get<RoleService>(RoleService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
