import { Controller, Post, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('group')
@UseGuards(JwtAuthGuard)
export class GroupController {

  constructor(private service: GroupService) {}

  @Post()
  create(@Body() body, @Req() req) {
    return this.service.create(body.name, req.user.userId);
  }

  @Post(':id/member')
  add(@Param('id') id: string, @Body() body, @Req() req) {
    return this.service.addMember(id, body.userId, req.user.userId);
  }

  @Delete(':id/member')   
  remove(@Param('id') id: string, @Body() body, @Req() req) {
    return this.service.removeMember(id, body.userId, req.user.userId);
  }
}