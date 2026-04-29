import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import type { Response } from 'express';
import { CreateUserDto } from './user.dto';
import { CreateUserPipe } from './user.pipeline';

@Controller('/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  async createUser(
    @Body(CreateUserPipe) payload: CreateUserDto,
    @Res() res: Response,
  ) {
    const response = await this.userService.createUser(payload);
    return res.status(response.statusCode).json({
      status: response.status,
      message: response.message,
    });
  }
}
