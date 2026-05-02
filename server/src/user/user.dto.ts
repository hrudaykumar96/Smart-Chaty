export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
}

export class LoginUserDto {
  email!: string;
  password!: string;
}

export class UpdatePasswordDto {
  email!: string;
  password!: string;
}
