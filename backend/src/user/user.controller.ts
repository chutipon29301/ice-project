import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserEntityDto } from './dto/create-user-entity.dto';
import { CreateAdminEntityDto } from './dto/create-admin-entity.dto';
import { User } from '../entities/user.entity';
import { UserModule } from './user.module';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async list() {
        const users = await this.userService.listUser();
        return users;
    }

    @Post('register')
    async registerUser(
        @Body() body: CreateUserEntityDto,
    ): Promise<User> {
        const user = await this.userService.create(
            body.nationalID,
            body.firstName,
            body.lastName,
            body.phone,
            body.authenticationID);
        return user;
    }

    @Post('registerAdmin')
    async registerAdmin(@Body() body: CreateAdminEntityDto): Promise<User> {
        const user = await this.userService.createAdmin(
            body.nationalID,
            body.firstName,
            body.lastName,
            body.phone,
            body.authenticationID,
            body.authenticationType);
        return user;
    }
}
