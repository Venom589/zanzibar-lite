import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Group } from 'src/schemas/group.schema';
import { RelationService } from 'src/relation/relation.service';

@Injectable()
export class GroupService {

  constructor(
    @InjectModel(Group.name) private model: Model<Group>,
    private relation: RelationService
  ) {}

  async create(name: string, userId: string) {

    const group = await this.model.create({ name });

    await this.relation.create(
      `user:${userId}`,
      'owner',
      `group:${group._id}`
    );

    return group;
  }

  async addMember(groupId: string, userId: string, actorId: string) {

    const ok = await this.relation.checkAccess(
      `user:${actorId}`,
      'owner',
      `group:${groupId}`
    );

    if (!ok) throw new ForbiddenException();

    return this.relation.create(
      `user:${userId}`,
      'member',
      `group:${groupId}`
    );
  }

  async removeMember(groupId: string, userId: string, actorId: string) {

    const ok = await this.relation.checkAccess(
      `user:${actorId}`,
      'owner',
      `group:${groupId}`
    );

    if (!ok) throw new ForbiddenException();

    return this.relation.delete(
      `user:${userId}`,
      'member',
      `group:${groupId}`
    );
  }
}