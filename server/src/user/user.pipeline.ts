import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { CreateUserDto, UpdatePasswordDto } from "./user.dto";

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) throw new BadRequestException("payload is required");

    if (!value.name || value.name.trim() === "")
      throw new BadRequestException("name is required");

    if (!value.email || value.email.trim() === "")
      throw new BadRequestException("email is required");

    if (!emailRegex.test(value.email))
      throw new BadRequestException("email is invalid");

    if (!value.password || value.password.trim() === "")
      throw new BadRequestException("password is required");

    return value;
  }
}

@Injectable()
export class LoginUserPipe implements PipeTransform {
  transform(value: CreateUserDto) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) throw new BadRequestException("payload is required");

    if (!value.email || value.email.trim() === "")
      throw new BadRequestException("email is required");

    if (!emailRegex.test(value.email))
      throw new BadRequestException("email is invalid");

    if (!value.password || value.password.trim() === "")
      throw new BadRequestException("password is required");

    return value;
  }
}

@Injectable()
export class UpdatePasswordPipe implements PipeTransform {
  transform(value: UpdatePasswordDto) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) throw new BadRequestException("payload is required");

    if (!value.email || value.email.trim() === "")
      throw new BadRequestException("email is required");

    if (!emailRegex.test(value.email))
      throw new BadRequestException("email is invalid");

    if (!value.password || value.password.trim() === "")
      throw new BadRequestException("password is required");

    return value;
  }
}
