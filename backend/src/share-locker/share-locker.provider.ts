import { Provider } from '@nestjs/common';
import { UserInvitationRepositoryToken, DbConnectionToken } from '../constant';
import { Connection } from 'typeorm';
import { UserInvitation } from '../entities/user-invitation.entity';

export const shareLockerProviders: Provider[] = [
    {
        provide: UserInvitationRepositoryToken,
        useFactory: (connection: Connection) => connection.getRepository(UserInvitation),
        inject: [DbConnectionToken],
    },
];
