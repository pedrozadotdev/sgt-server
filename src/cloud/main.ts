/* global Parse */
Parse.Cloud.define(
  'hello',
  req => `Hi ${req.user ? req.user.getUsername() : 'Unknown'}`,
);
