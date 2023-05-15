import { User } from '@prisma/client';
import { MyJwtGuard } from './../auth/guard/myjwt.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from '../auth/decorator/user.decorator';
@Controller('user')
export class UserController {
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    //no protection
    //need guard to protect
    //  console.log(JSON.stringify(Object.keys(req)));
    return user;
  }
}
