export default {
  name: 'Vehicle',
  schema: {
    licensePlate: {
      type: 'String',
      required: true,
    },
    titularDriver: {
      type: 'Pointer',
      targetClass: '_User',
      required: false,
    },
    alternateDriver: {
      type: 'Pointer',
      targetClass: '_User',
      required: false,
    },
    model: {
      type: 'String',
      required: true,
    },
    brand: {
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
  },
} as ClassInfo<Vehicle>;
