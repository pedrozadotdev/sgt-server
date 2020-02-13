export default {
  name: 'Absence',
  schema: {
    start: {
      type: 'Date',
      required: true,
    },
    end: {
      type: 'Date',
      required: true,
    },
    proof: {
      type: 'File',
      required: false,
    },
    driver: {
      type: 'Pointer',
      targetClass: '_User',
      required: true,
    },
    type: {
      type: 'String',
      required: true,
    },
  },
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
    readUserFields: ['driver'],
  },
} as ClassInfo<Absence>;
