import { ToDate, SanitizeNested, ToInt } from 'class-sanitizer';
import { ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';

export class LineUserEventDto {
    // @ValidateNested()
    // @SanitizeNested()
    // @Type(type => LineEventDto)
    events: LineEventDto[];

    @IsString()
    destination: string;
}

export class LineEventDto {
    @ApiModelProperty({
        description: 'type of line event',
        required: true,
    })
    @IsString()
    // @ToInt()
    type: 'message' | 'postback' | 'follow';

    @ApiModelProperty({
        description: 'Reply token',
        required: true,
    })
    @IsString()
    replyToken: string;

    // @ValidateNested()
    // @SanitizeNested()
    // @Type(type => LineUserDto)
    source: LineUserDto[];

    @ApiModelProperty({
        description: 'timestamp',
        required: true,
    })
    @ToDate()
    timestamp: Date;

    
    message: LineMessageDto;

    postback: LinePostbackDto;
}

export class LineUserDto {
    @IsString()
    userID: string;

    @IsString()
    type: 'user';
}

export class LineMessageDto {
    text: string;
}

export class LinePostbackDto {
    data: string;
}
