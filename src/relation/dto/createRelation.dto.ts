import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RelationEnum, ResourceEnum, SubjectEnum } from "src/constants/relation.constant";

export class createRelationDto {

   @ApiProperty({
        type:String,
        required:true,
        description:"mongoose Id of user or group",
        example:"mongoose Id"
    })
    @IsNotEmpty()
    @IsString()
    subject: string

    @ApiProperty({
        type:String,
        required:true,
        description:"mongoose Id of user or group",
        example:SubjectEnum.GROUP,
        enum:SubjectEnum
    })
    @IsNotEmpty()
    @IsEnum(SubjectEnum)
    subjectType: string

    @ApiProperty({
        type:String,
        required:true,
        description:"name of relation",
        example:RelationEnum.OWNER,
        enum:RelationEnum
    })
    @IsNotEmpty()
    @IsEnum(RelationEnum)
    relation: RelationEnum

    @ApiProperty({
        type:String,
        required:true,
        description:"list id or group id",
        example:"This is group of all the backend developers or this is a list"
    })
    @IsNotEmpty()
    @IsString()
    resource: string

    @ApiProperty({
        type:String,
        required:true,
        description:"type of resource",
        example:ResourceEnum.GROUP
    })
    @IsNotEmpty()
    @IsEnum(ResourceEnum)
    resourceType: ResourceEnum

}