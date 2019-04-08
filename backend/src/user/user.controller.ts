import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserEntityDto } from './dto/create-user-entity.dto';
import { CreateAdminEntityDto } from './dto/create-admin-entity.dto';
import { User, Role } from '../entities/user.entity';
import { Roles } from '../guard/role.decorator';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User as UserDecorator } from '../decorator/user.decorator'
import { JwtToken } from '../jwt-auth/dto/jwt-token.dto';

@ApiUseTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Get()
    async list(): Promise<{ users: User[] }> {
        const users = await this.userService.listUser();
        return { users };
    }

    @Roles(Role.USER, Role.SUPERUSER)
    @Get('creditHistory')
    async creditHistory(
        @UserDecorator() user: JwtToken,
    ): Promise<User> {
        return this.userService.findUser({
            key: {
                nationalID: user.nationalID
            },
            joinWith: ['creditUsages'],
        });
    }

    @Post('register')
    async registerUser(@Body() body: CreateUserEntityDto): Promise<User> {
        const user = await this.userService.create(body.nationalID, body.firstName, body.lastName, body.phone, body.authenticationID);
        return user;
    }

    @Post('registerAdmin')
    async registerAdmin(@Body() body: CreateAdminEntityDto): Promise<User> {
        const user = await this.userService.createAdmin(body.nationalID, body.firstName, body.lastName, body.phone, body.authenticationID);
        return user;
    }
}
