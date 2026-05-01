import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateListDto {

    @ApiProperty({
        type:String,
        description:"Title of the list",
        example:"Grocery List"
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: String,
        description: "Description of the list",
        example: "List of items to buy at the grocery store"
    })
    @IsString()
    @IsNotEmpty()
    description: string;

}