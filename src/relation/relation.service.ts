import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Relation, RelationDocument } from 'src/schemas/relation.schema';
import {
  RELATION_ALLOWED,
  RELATION_HIERARCHY,
} from 'src/constants/relation.constant';

@Injectable()
export class RelationService {

  constructor(
    @InjectModel(Relation.name)
    private model: Model<RelationDocument>
  ) {}

  private parse(v: string) {
    if (!v.includes(':')) throw new BadRequestException('Invalid format');
  }

  async create(subject: string, relation: string, resource: string) {

    this.parse(subject);
    this.parse(resource);

    const existing = await this.model.find({ subject, resource });

    for (const rel of existing) {
      const current = RELATION_HIERARCHY[rel.relation] || 0;
      const incoming = RELATION_HIERARCHY[relation] || 0;

      if (current >= incoming) {
        throw new BadRequestException('Permission exists');
      }

      await this.model.deleteOne({ _id: rel._id });
    }

    return this.model.create({ subject, relation, resource });
  }

  async delete(subject: string, relation: string, resource: string) {
    return this.model.deleteOne({ subject, relation, resource });
  }

  async checkAccess(subject: string, relation: string, resource: string, visited = new Set()) {

    const key = `${subject}-${resource}`;
    if (visited.has(key)) return false;

    visited.add(key);

    const direct = await this.model.exists({
      subject,
      relation: { $in: RELATION_ALLOWED[relation] || [relation] },
      resource,
    });

    if (direct) return true;

    const relations = await this.model.find({ subject });

    for (const rel of relations) {
      const result = await this.checkAccess(rel.resource, relation, resource, visited);
      if (result) return true;
    }

    return false;
  }

  async deleteByResource(resource: string) {
    return this.model.deleteMany({ resource });
  }

  async getAccessibleResources(
    subject: string,
    resourceType: string
  ): Promise<string[]> {

    const visited = new Set<string>();
    const results = new Set<string>();
    
    const dfs = async (node: string) => {
    
      if (visited.has(node)) return;
      visited.add(node);
    
      const relations = await this.model.find({ subject: node });
    
      for (const rel of relations) {
      
        // if resource matches type (list:xxx)
        if (rel.resource.startsWith(`${resourceType}:`)) {
          results.add(rel.resource.split(':')[1]);
        }
      
        // traverse deeper
        await dfs(rel.resource);
      }
    };
  
    await dfs(subject);
  
    return Array.from(results);
}
}