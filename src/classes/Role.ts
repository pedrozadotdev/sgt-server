import { ClassInfo } from '.';

interface Role {}

export default {
  name: '_Role',
  permissions: {
    find: {},
    count: {},
    get: {},
    create: {},
    update: {},
    delete: {},
    addField: {},
    protectedFields: {}
  }
} as ClassInfo<Role>;
