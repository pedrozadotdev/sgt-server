import Config from 'parse-server/lib/Config';
import Parse from 'parse/node';

import { createClass, createRole, classes } from '.';

interface ParseConfig {
  appId: string;
  masterKey: string;
  serverURL: string;
}

function initParse ({ appId, serverURL, masterKey }: ParseConfig) {
  Parse.initialize(appId, undefined, masterKey);
  Parse.serverURL = serverURL;
}

async function createRoles() {
  await createRole('admin');
  await createRole('driver');
}

export default async function (config: ParseConfig) {

  initParse(config);

  await createRoles();

  // Config ParseServer to add Class Schemas.
  const parseMount = `/${config.serverURL.split('/').slice(-1)[0]}`;
  const serverConfig = new Config(config.appId, parseMount);
  const serverSchema = await serverConfig.database.loadSchema();

  for (const newClass of classes) {
    await createClass(serverSchema, newClass);
  }
  console.log('Classes Executed!');
}
