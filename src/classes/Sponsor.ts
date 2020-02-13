export default {
  name: 'Sponsor',
  schema: {
    name: {
      type: 'String',
      required: true,
    },
    siape: {
      type: 'String',
      required: true,
    },
  },
  permissions: {
    find: {
      'role:admin': true,
    },
    count: {
      'role:admin': true,
    },
    get: {
      'role:admin': true,
      'role:driver': true,
    },
    create: {
      'role:admin': true,
    },
    update: {
      'role:admin': true,
    },
    delete: {
      'role:admin': true,
    },
    addField: {},
    protectedFields: {},
  },
} as ClassInfo<Sponsor>;
