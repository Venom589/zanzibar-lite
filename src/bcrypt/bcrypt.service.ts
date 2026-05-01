import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

    constructor(){}

    async hashPassword(password: string){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async comparePassword(password: string, hashedPassword: string){
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }

}
