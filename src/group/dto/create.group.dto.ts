import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateGroupDto {
    @ApiProperty({
        type:String,
        required:true,
        description:"Name of the group",
        example:"Backend Dev"
    })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        type:String,
        required:true,
        description:"description of group",
        example:"This is group of all the backend developers"
    })
    @IsNotEmpty()
    @IsString()
    description: string
    
}

export class AddMemberDto {

  @IsString()
  @IsNotEmpty()
  userId: string;
}