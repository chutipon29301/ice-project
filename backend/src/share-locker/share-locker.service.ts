import {
    Injectable,
    Inject,
    UnauthorizedException,
    NotFoundException,
    HttpException,
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
        try {
            const lockerInstance = await this.lockerInstanceService.findInUsedLockerInstanceByLockerIDOrFail(
                lockerID,
            );
            if (lockerInstance.ownerUser.nationalID !== nationalID) {
                throw new UnauthorizedException('Not owner user');
            }
            const userInvitation = new UserInvitation(lockerInstance);
            await this.userInvitationRepository.save(userInvitation);
            return `${this.configService.liffServerURL}/share?accessCode=${
                userInvitation.id
            }`;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async addUserPermission(nationalID: string, accessCode: string) {
        try {
            const userInvitation = await this.userInvitationRepository.findOneOrFail(
                {
                    where: { id: accessCode, isUsed: false },
                    relations: ['lockerInstance'],
                },
            );
            userInvitation.isUsed = true;
            await this.userInvitationRepository.save(userInvitation);
            const user = await this.userService.findUserWithNationalIDOrFail(
                nationalID,
            );
            const lockerInstance = await this.lockerInstanceService.findInUsedLockerInstanceByLockerIDOrFail(
                userInvitation.lockerID,
            );
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }
}
