import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('login')
    async login(@Body() data:LoginUserDto){
        const user = await this.authService.loginUser(data);
        return user;
    }

    @Post('register')
    async register(@Body() data:CreateUserDto){
        const user = await this.authService.createUser(data);
        return user;
    }

}
