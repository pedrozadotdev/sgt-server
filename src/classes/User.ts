export default {
  name: '_User',
  permissions: {
    find: {
      'role:admin': true,
      'role:driver': true,
    },
    count: {
      'role:admin': true,
      'role:driver': true,
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
} as ClassInfo<undefined>;
