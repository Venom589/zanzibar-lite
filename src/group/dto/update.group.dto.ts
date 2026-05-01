import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class UpdateGroupDto {
    @ApiProperty({
        type:String,
        required:true,
        description:"mongoose Id",
        example:"mongoose Id"
    })
    @IsNotEmpty()
    @IsString()
    groupId: string

    @ApiProperty({
        type:Array,
        required:true,
        description:"Array of mongoose id",
        example:["mongoose id", "mongoose id", "mongoose id"]
    })
    @IsNotEmpty()
    @IsArray()
    members: string[]

    @ApiProperty({
        type:Boolean,
        required:true,
        description:"if what to add user mark true or false for removing",
        example:true
    })
    @IsNotEmpty()
    @IsBoolean()
    toAdd:boolean

}