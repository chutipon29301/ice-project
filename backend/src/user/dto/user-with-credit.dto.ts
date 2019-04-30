import { Role, AuthenticationType, UserStatus } from '../../entities/user.entity';

export class UserWithCreditDto {
    nationalID: string;
    firstName: string;
    lastName: string;
    role: Role;
    authenticationID: string;
    authenticationType: AuthenticationType;
    phone: string;
    status: UserStatus;
    profileImage: string;
    totalCredit: number;
}