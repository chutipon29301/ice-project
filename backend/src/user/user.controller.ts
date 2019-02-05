import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import Users from '../models/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async listAllUsers(): Promise<Users[]> {
        return await this.userService.listAll();
    }

    @Post()
    async registerUser(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(
            createUserDto.lineID,
            createUserDto.firstName,
            createUserDto.lastName,
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
