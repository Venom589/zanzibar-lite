import { Module } from '@nestjs/common';
import { RelationController } from './relation.controller';
import { RelationService } from './relation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Relation, RelationSchema } from 'src/schemas/relation.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Relation.name, schema: RelationSchema},
    ]),
    AuthModule,
    CommonModule,
  ],
  controllers: [RelationController],
  providers: [RelationService],
  exports: [RelationService]
})
export class RelationModule {}
