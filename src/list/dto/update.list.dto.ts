import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateListDto{

    @ApiProperty({
        type:String,
        description:"Title of the list",
        example:"Grocery List",
        required: false
    })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({
        type: String,
        description: "Description of the list",
        example: "List of items to buy at the grocery store",
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        type:Boolean,
        description:"to mark task complete",
        example: false,
        required:false
    })
    @IsBoolean()
    @IsOptional()
    completed?:boolean

}