import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {

    constructor(){}

    functionMessage(error:boolean,message:String, data:any){
        return {error, message, data}
    }
}
