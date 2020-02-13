export default {
  name: 'AbsenceType',
  schema: {
    name: {
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
} as ClassInfo<AbsenceType>;
