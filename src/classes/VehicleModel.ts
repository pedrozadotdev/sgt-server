export default {
  name: 'VehicleModel',
  schema: {
    name: {
      type: 'String',
      required: true,
    },
    brand: {
      type: 'Pointer',
      targetClass: 'VehicleBrand',
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
} as ClassInfo<VehicleModel>;
