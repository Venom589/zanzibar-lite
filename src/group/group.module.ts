import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from 'src/schemas/group.schema';
import { RelationModule } from 'src/relation/relation.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([
      {name:Group.name, schema:GroupSchema}
    ]),
    RelationModule,
    CommonModule
  ],
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupModule {}
