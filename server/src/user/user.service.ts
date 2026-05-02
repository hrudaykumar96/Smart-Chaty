import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from "./user.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly UserModel: Model<CreateUserDto>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async createUser(
    payload: CreateUserDto,
  ): Promise<{ status: string; statusCode: number; message: string }> {
    try {
      const { name, email, password } = payload;

      const user = await this.UserModel.findOne({ email });

      if (user) {
        return {
          status: "error",
          statusCode: 400,
          message: "User already exists",
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
        status: "success",
        statusCode: 201,
        message: "User Created Successfully",
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: "error",
        statusCode: 500,
        message: "internal server error",
      };
    }
  }

  async loginUser(payload: LoginUserDto): Promise<{
    status: string;
    statusCode: number;
    message: string;
    data?: string;
  }> {
    try {
      const { email, password } = payload;

      const user = await this.UserModel.findOne({ email });
      if (!user) {
        return {
          status: "error",
          statusCode: 400,
          message: "Email not Registered",
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          status: "error",
          statusCode: 400,
          message: "Invalid Password",
        };
      }

      const token = this.jwtService.sign({ userId: user._id });

      return {
        status: "success",
        statusCode: 200,
        message: "User Logged In Successfully",
        data: token,
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: "error",
        statusCode: 500,
        message: "internal server error",
      };
    }
  }

  async getProfile(token: string): Promise<{
    status: string;
    statusCode: number;
    message: string;
    data?: any;
  }> {
    {
      try {
        const decoded = this.jwtService.verify(token, {
          secret: this.configService.get("JWT_SECRET"),
        });
        const userId = decoded.userId;
        const user = await this.UserModel.findById(userId).select("-password");
        if (!user) {
          return {
            status: "error",
            statusCode: 404,
            message: "User not found",
          };
        }
        return {
          status: "success",
          statusCode: 200,
          message: "User profile fetched successfully",
          data: user,
        };
      } catch (error) {
        Logger.error(error);
        return {
          status: "error",
          statusCode: 500,
          message: "internal server error",
        };
      }
    }
  }

  async updatePassword(payload: UpdatePasswordDto): Promise<{
    status: string;
    statusCode: number;
    message: string;
  }> {
    try {
      const { email, password } = payload;

      const user = await this.UserModel.findOne({ email });
      if (!user) {
        return {
          status: "error",
          statusCode: 404,
          message: "User not found",
        };
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      user.password = hashedPassword;
      await user.save();

      return {
        status: "success",
        statusCode: 200,
        message: "Password Updated Successfully",
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: "error",
        statusCode: 500,
        message: "internal server error",
      };
    }
  }
}
