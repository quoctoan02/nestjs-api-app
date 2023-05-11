import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User, Note } from '@prisma/client';
import * as argon from 'argon2';
@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  register() {
    return {
      message: 'register',
    };
  }
  login() {
    return {
      message: 'register',
    };
  }
}
