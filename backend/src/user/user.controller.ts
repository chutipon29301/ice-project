import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../guard/role.decorator';
import Users, { Role } from '../models/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.ADMIN)
    @Get()
    async listAllUsers(): Promise<Users[]> {
        return await this.userService.listAll();
    }

    @Get('register')
    async register(@Res() res: Response, @Query() query: RegisterUserDto) {
        res.redirect(this.userService.redirectLink(query.name, query.role));
    }

    @Get('register/callback')
    async callback(
        @Query('code') code: string,
        @Query('state') state: string,
        @Query('error') error: string,
        @Query('errorCode') errorCode: string,
        @Query('errorMessage') errorMessage: string,
        @Res() res: Response,
    ) {
        if (error != null || errorCode != null || errorMessage != null) {
            throw new UnauthorizedException(errorMessage);
        }
        await this.userService.register(code, state);
        // TODO: Change redirect url to front end page
        res.redirect('https://www.google.com');
    }

    @Roles(Role.ADMIN)
    @Post()
    async registerUser(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(
            createUserDto.name,
            createUserDto.oAuthID,
        );
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    async edit(@Param('id') id: string, @Body() editUserDto: EditUserDto) {
        await this.userService.edit(parseInt(id, 10), editUserDto);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.userService.delete(parseInt(id, 10));
    }
}
