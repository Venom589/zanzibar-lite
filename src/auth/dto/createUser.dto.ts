import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: "Name of the user",
        example: "John Doe"
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: "Email of the user",
        example: "john.doe@example.com"
    })
    @IsNotEmpty()
    @IsEmail()
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