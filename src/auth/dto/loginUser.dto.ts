import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

    @ApiProperty({
        type: String,
        description: "Email of the user",
        example: "john.doe@example.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        description: "Password of the user",
        example: "password123"
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}