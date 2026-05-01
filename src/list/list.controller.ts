import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create.list.dto';
import { UpdateListDto } from './dto/update.list.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('list')
export class ListController {

    constructor(
        private listService: ListService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() body, @Req() req) {
        return this.listService.create(body, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    get(@Param('id') id: string, @Req() req) {
        return this.listService.get(id, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() body, @Req() req) {
        return this.listService.update(id, req.user.userId, body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string, @Req() req) {
        return this.listService.delete(id, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() req) {
      return this.listService.getAllAccessible(req.user.userId);
    }

}
