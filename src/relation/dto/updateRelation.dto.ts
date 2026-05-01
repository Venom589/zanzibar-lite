import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RelationEnum } from "src/constants/relation.constant";

export class updateRelationDto {
    
    @ApiProperty({
        type:String,
        required:true,
        description:"mongoose Id",
        example:"mongoose Id"
    })
    @IsNotEmpty()
    @IsString()
    relationId: string

    @ApiProperty({
        type:Array,
        required:true,
        description:"relation of the user or group",
        example:RelationEnum.EDITOR,
        enum:RelationEnum
    })
    @IsNotEmpty()
    @IsEnum(RelationEnum)
    Relation: RelationEnum

}