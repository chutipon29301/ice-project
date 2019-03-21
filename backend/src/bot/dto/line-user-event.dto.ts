import { ToDate, SanitizeNested, ToInt } from 'class-sanitizer';
import { ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

export class LineUserEventDto {
    // @ValidateNested()
    // @SanitizeNested()
    // @Type(type => LineEventDto)
    events: LineEventDto[];

    @IsString()
    destination: string;
}

export class LineEventDto {
    @IsString()
    // @ToInt()
    type: 'message' | 'postback';

    @IsString()
    replyToken: string;

    // @ValidateNested()
    // @SanitizeNested()
    // @Type(type => LineUserDto)
    source: LineUserDto[];

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
