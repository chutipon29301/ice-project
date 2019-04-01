import {
    Injectable,
    Inject,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { UserInvitationRepositoryToken } from '../constant';
import { UserInvitation } from '../entities/user-invitation.entity';

import { LockerInstanceService } from '../locker-instance/locker-instance.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ShareLockerService {
    constructor(
        @Inject(UserInvitationRepositoryToken)
        private readonly userInvitationRepository: Repository<UserInvitation>,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly lockerInstanceService: LockerInstanceService,
    ) {}

    public async generateInvitationLink(lockerID: number, nationalID: string) {
        const lockerInstance = await this.lockerInstanceService.findInUsedLockerInstanceByLockerID(
            lockerID,
        );
        if (!lockerInstance) {
            throw new NotFoundException('Locker instance not found');
        }
        if (lockerInstance.ownerUser.nationalID !== nationalID) {
            throw new UnauthorizedException('Not owner user');
        }
        const userInvitation = new UserInvitation(lockerInstance);
        await this.userInvitationRepository.save(userInvitation);
        return `${this.configService.liffServerURL}/share?accessCode=${
            userInvitation.id
        }`;
    }

    public async addUserPermission(nationalID: string, accessCode: string) {
        const userInvitation = await this.userInvitationRepository.findOne({
            where: { id: accessCode, isUsed: false },
            relations: ['lockerInstance'],
        });
        if (!userInvitation) {
            throw new UnauthorizedException('Invalid invitation code');
        }
        const user = await this.userService.getUserWithNationalID(nationalID);
        const lockerInstance = await this.lockerInstanceService.findInUsedLockerInstanceByLockerID(
            userInvitation.lockerID,
        );
        // lockerInstance.accessibleUsers.push(user);
    }
}
