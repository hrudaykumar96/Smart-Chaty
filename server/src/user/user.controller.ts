import { Body, Controller, Get, Headers, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import type { Response } from "express";
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from "./user.dto";
import {
  CreateUserPipe,
  LoginUserPipe,
  UpdatePasswordPipe,
} from "./user.pipeline";

@Controller("/auth")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create-user")
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

  @Post("/login")
  async loginUser(
    @Body(LoginUserPipe) payload: LoginUserDto,
    @Res() res: Response,
  ) {
    const response = await this.userService.loginUser(payload);
    return res.status(response.statusCode).json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  }

  @Get("/profile")
  async getProfile(
    @Headers("Authorization") authHeader: string,
    @Res() res: Response,
  ) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];
    const response = await this.userService.getProfile(token);
    return res.status(response.statusCode).json({
      status: response.status,
      message: response.message,
      data: response.data,
    });
  }

  @Post("/update-password")
  async updatePassword(
    @Body(UpdatePasswordPipe) payload: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    const response = await this.userService.updatePassword(payload);
    return res.status(response.statusCode).json({
      status: response.status,
      message: response.message,
    });
  }
}
