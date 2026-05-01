import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class validateRelationDto {
    @ApiProperty({
        type:String,
        required:true,
        description:"email of user",
        example:"mongoose id"
    })
    @IsEmail()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        type:String,
        required:true,
        description:"Id of List",
        example:"mongoose Id"
    })
    @IsString()
    @IsNotEmpty()
    relationId: string;
}