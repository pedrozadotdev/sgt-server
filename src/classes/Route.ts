export default {
  name: 'Route',
  schema: {
    date: {
      type: 'Date',
      required: true,
    },
    isReturnTrip: {
      type: 'Boolean',
      required: false,
      defaultValue: false,
    },
    proof: {
      type: 'File',
      required: false,
    },
    reason: {
      type: 'String',
      required: true,
    },
    destination: {
      type: 'Pointer',
      targetClass: 'Destination',
      required: true,
    },
    returnTrip: {
      type: 'Pointer',
      targetClass: 'Route',
      required: false,
    },
    Route: {
      type: 'Pointer',
      targetClass: 'Route',
      required: true,
    },
    sector: {
      type: 'Pointer',
      targetClass: 'Sector',
      required: true,
    },
    sponsor: {
      type: 'Pointer',
      targetClass: 'Sponsor',
      required: false,
    },
    driver: {
      type: 'Pointer',
      targetClass: '_User',
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
} as ClassInfo<Route>;
