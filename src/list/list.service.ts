import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { List, ListDocument } from 'src/schemas/list.schema';
import { RelationService } from 'src/relation/relation.service';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class ListService {

  constructor(
    @InjectModel(List.name) private model: Model<ListDocument>,
    private relation: RelationService,
    private commonService: CommonService
  ) {}

  async create(data, userId: string) {

    const list = await this.model.create(data);

    await this.relation.create(
      `USER:${userId}`,
      'OWNER',
      `LIST:${list._id}`
    );

    return list;
  }

  async get(id: string, userId: string) {

    const ok = await this.relation.checkAccess(
      `USER:${userId}`,
      'VIEWER',
      `LIST:${id}`
    );

    if (!ok) throw new ForbiddenException();

    return this.model.findById(id);
  }

  async update(id: string, userId: string, data) {

    const ok = await this.relation.checkAccess(
      `USER:${userId}`,
      'EDITOR',
      `LIST:${id}`
    );

    if (!ok) throw new ForbiddenException();

    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string, userId: string) {

    const ok = await this.relation.checkAccess(
      `USER:${userId}`,
      'OWNER',
      `LIST:${id}`
    );
    console.log(ok);
    if (!ok) throw new ForbiddenException();

    await this.relation.deleteByResource(`LIST:${id}`);

    return this.model.findByIdAndDelete(id);
  }
  async getAllAccessible(userId: string) {

    const subject = `USER:${userId}`;

    const listIds = await this.relation.getAccessibleResources(
      subject,
      'LIST'
    );

    if (!listIds.length) return [];

    return this.model.find({
      _id: { $in: listIds }
    });
  }
}