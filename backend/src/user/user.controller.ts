import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Patch,
    Query,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import Users from '../models/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async listAllUsers(): Promise<Users[]> {
        return await this.userService.listAll();
    }

    @Get('register')
    async register(@Res() res: Response) {
        res.redirect(this.userService.redirectLink);
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
        return await this.userService.register(code, state);
    }

    @Post()
    async registerUser(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(
            createUserDto.roleID,
            createUserDto.name,
            createUserDto.oAuthID,
        );
    }

    @Patch(':id')
    async edit(@Param('id') id: string, @Body() editUserDto: EditUserDto) {
        await this.userService.edit(parseInt(id, 10), editUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.userService.delete(parseInt(id, 10));
    }
}
