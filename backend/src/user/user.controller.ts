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
import { ApiUseTags, ApiOkResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
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
    constructor(private readonly userService: UserService) { }

    @ApiBadRequestResponse({ description: 'fail to query all user information' })
    @Roles(Role.ADMIN)
    @Get()
    async listAllUsers(): Promise<Users[]> {
        return await this.userService.listAll();
    }

    @ApiOkResponse({ description: 'user successfully redirected' })
    @ApiBadRequestResponse({ description: 'fail to redirect' })
    @Get('register')
    async register(@Res() res: Response, @Query() query: RegisterUserDto) {
        res.redirect(this.userService.redirectLink(query.name, query.role));
    }

    @ApiOkResponse({ description: 'successfully get callback from Line' })
    @ApiBadRequestResponse({ description: 'fail to request callback from Line' })
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

    @ApiCreatedResponse({ description: 'user successfully registered to the system' })
    @ApiBadRequestResponse({ description: 'fail to registered' })
    @Roles(Role.ADMIN)
    @Post()
    async registerUser(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(
            createUserDto.name,
            createUserDto.oAuthID,
        );
    }

    @ApiOkResponse({ description: 'Successfully edit user information' })
    @ApiBadRequestResponse({ description: 'fail to edit user information' })
    @Roles(Role.ADMIN)
    @Patch(':id')
    async edit(@Param('id') id: string, @Body() editUserDto: EditUserDto) {
        await this.userService.edit(parseInt(id, 10), editUserDto);
    }

    @ApiOkResponse({ description: 'Successfully delete user information' })
    @ApiBadRequestResponse({ description: 'fail to delete user information' })
    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.userService.delete(parseInt(id, 10));
    }
}
