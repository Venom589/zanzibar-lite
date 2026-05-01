import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from '@nestjs/config';
import { RelationModule } from './relation/relation.module';
import { GroupModule } from './group/group.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI||'mongodb://localhost:27017/nestjs-crud'),
    AuthModule,
    BcryptModule,
    ListModule,
    RelationModule,
    GroupModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
