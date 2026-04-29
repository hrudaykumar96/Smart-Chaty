import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<CreateUserDto>,
  ) {}
  async createUser(
    payload: CreateUserDto,
  ): Promise<{ status: string; statusCode: number; message: string }> {
    try {
      const { name, email, password } = payload;

      const user = await this.UserModel.findOne({ email });

      if (user) {
        return {
          status: 'error',
          statusCode: 400,
          message: 'User already exists',
        };
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      const newUser = new this.UserModel({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return {
        status: 'success',
        statusCode: 201,
        message: 'User Created Successfully',
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: 'error',
        statusCode: 500,
        message: 'internal server error',
      };
    }
  }
}
