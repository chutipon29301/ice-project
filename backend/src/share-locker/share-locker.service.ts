import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { UserInvitationRepositoryToken } from '../constant';
import { UserInvitation } from '../entities/user-invitation.entity';

@Injectable()
export class ShareLockerService {
    constructor(
        @Inject(UserInvitationRepositoryToken)
        private readonly userInvitationRepository: Repository<UserInvitation>,
        private readonly userService: UserService,
    ) {}

    public generateInvitationLink() {}
    public addUserToShareAccess() {}
}
