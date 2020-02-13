import Config from 'parse-server/lib/Config';
import Parse from 'parse/node';

import { createClass, createRole, classes } from '.';

function initParse({ appId, serverURL, masterKey }: ParseConfig): void {
  Parse.initialize(appId, undefined, masterKey);
  Parse.serverURL = serverURL;
}

async function createRoles(): Promise<void> {
  await createRole('admin');
  await createRole('driver');
}

export default async function(config: ParseConfig): Promise<void> {
  initParse(config);

  await createRoles();

  const serverSchema = await Config.get(config.appId).database.loadSchema();

  // eslint-disable-next-line no-restricted-syntax
  for (const newClass of classes) {
    await createClass(serverSchema, newClass);
  }
}
