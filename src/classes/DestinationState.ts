export default {
  name: 'DestinationState',
  schema: {
    name: {
      type: 'String',
      required: true,
    },
    acronym: {
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
} as ClassInfo<DestinationState>;
