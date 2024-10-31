import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(6, 100)
  password: string;
}
