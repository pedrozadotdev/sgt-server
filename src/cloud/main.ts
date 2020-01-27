// eslint-disable-next-line no-undef
Parse.Cloud.define(
  'hello',
  req => `Hi ${req.user ? req.user.getUsername() : 'Unknown'}`,
);
