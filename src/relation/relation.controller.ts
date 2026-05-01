import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RelationService } from './relation.service';
import { AuthGuard } from '@nestjs/passport';
import { createRelationDto } from './dto/createRelation.dto';
import { updateRelationDto } from './dto/updateRelation.dto';
import { UpdateListByRelationDto } from './dto/updateListByReleation.dto';

@Controller('relation')
export class RelationController {

    constructor(private readonly service: RelationService) {}

  @Post()
  create(@Body() dto: createRelationDto) {
    const subject = `${dto.subjectType}:${dto.subject}`;
    const resource = `${dto.resourceType}:${dto.resource}`;
    const relation = dto.relation;
    return this.service.create(subject, relation, resource);
  }

  @Get('check')
  check(
    @Query('subject') subject: string,
    @Query('relation') relation: string,
    @Query('resource') resource: string
  ) {
    return this.service.checkAccess(subject, relation, resource);
  }

  @Delete()
  delete(
    @Query('subject') subject: string,
    @Query('relation') relation: string,
    @Query('resource') resource: string
  ) {
    return this.service.delete(subject, relation, resource);
  }
 
  
  // @Get('explain')
  // explain(
  //   @Query('subject') subject: string,
  //   @Query('relation') relation: string,
  //   @Query('resource') resource: string
  // ) {
  //   return this.service.explainAccess(subject, relation, resource);
  // }
}
