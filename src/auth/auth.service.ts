import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from './dto/loginUser.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private bcryptService: BcryptService,
        private jwtService: JwtService,
        private commonService: CommonService
    ){}

    async createUser(data : CreateUserDto){
        try {
            data.password = await this.bcryptService.hashPassword(data.password);
            const isUserExist = await this.userModel.findOne({email:data.email});
            console.log(isUserExist);
            if(!isUserExist){
                const user = await this.userModel.create(data);
                return this.commonService.functionMessage(false, "success", user);
            }
            return this.commonService.functionMessage(true, "User already exist with this mail id", null);
        } catch (error) {
            console.log("Error on creating user",error);
            return this.commonService.functionMessage(true, "Error on creating user", null);
        }
    }

    async loginUser(data: LoginUserDto){
        try {
            const user = await this.userModel.findOne({ email: data.email });
            if (!user) {
                return this.commonService.functionMessage(true, "User not found", null)
            }
            const isPasswordValid = await this.bcryptService.comparePassword(data.password, user.password);
            if (!isPasswordValid) {
                return this.commonService.functionMessage(true, "Invalid password", null);
            }
            const payload = { userId: user._id, email: user.email };
            const accessToken = await this.jwtService.signAsync(payload);
            return this.commonService.functionMessage(false, "Login successful", accessToken)
        } catch (error) {
            console.log("Error on login user",error);
            return this.commonService.functionMessage(true, "Error on login user", null);
        }
    }
}