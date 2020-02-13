export default {
  name: 'Destination',
  schema: {
    city: {
      type: 'String',
      required: true,
    },
    state: {
      type: 'String',
      required: true,
    },
    stateAcronym: {
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
} as ClassInfo<Destination>;
