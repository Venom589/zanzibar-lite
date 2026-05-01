export enum RelationEnum {
  OWNER = 'OWNER',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  MEMBER = 'MEMBER',
}

export const RELATION_HIERARCHY = {
  OWNER: 3,
  EDITOR: 2,
  VIEWER: 1,
};

export const RELATION_ALLOWED = {
  OWNER: ['OWNER', 'EDITOR', 'VIEWER'],
  EDITOR: ['EDITOR', 'VIEWER'],
  VIEWER: ['VIEWER'],
  MEMBER: ['MEMBER'],
};

export enum SubjectEnum {
  USER = 'USER',
  GROUP = 'GROUP',
}

export enum ResourceEnum {
  LIST = 'LIST',
  GROUP = 'GROUP',
}
// | Type              | Example                      |
// | ----------------- | ---------------------------- |
// | Group ownership   | `user:1#owner@group:teamA`   |
// | Membership        | `user:2#member@group:teamA`  |
// | Group permission  | `group:teamA#viewer@list:10` |
// | Direct permission | `user:2#viewer@list:10`      |
// | Nested group      | `group:A#member@group:B`     |
