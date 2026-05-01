import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from 'src/schemas/list.schema';
import { AuthModule } from 'src/auth/auth.module';
import { Relation, RelationSchema } from 'src/schemas/relation.schema';
import { CommonModule } from 'src/common/common.module';
import { RelationModule } from 'src/relation/relation.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:List.name, schema: ListSchema},
    ]),
    AuthModule,
    CommonModule,
    RelationModule
  ],
  controllers: [ListController],
  providers: [ListService],
  exports:[ListService]
})
export class ListModule {}
