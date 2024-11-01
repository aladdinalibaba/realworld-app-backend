import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req) {
    return req.user;
  }
}
