declare module 'parse-server' {
  import http from 'http';
  interface LiveQueryConfig {
    classNames: string[];
  }

  interface Config {
    databaseURI: string;
    serverURL: string;
    cloud: string;
    appId: string;
    masterKey: string;
    liveQuery: LiveQueryConfig;
  }

  export class ParseServer {
    constructor(config: Config)
    static createLiveQueryServer(httpServer : http.Server) : void;
  }
}

declare module 'parse-server/lib/Config' {

  interface Role {
    [key: string]: boolean;
  }
  export interface ClassPermission {
    get: Role;
    find: Role;
    create: Role;
    update: Role;
    delete: Role;
    addField: Role;
    protectedFields: Role;
    readUserFields?: string[];
  }
  export interface Schema {
    addClassIfNotExists<T>(name: string, data: T): Promise<void>;
    setPermissions(name: string, permissions: ClassPermission): Promise<void>;
  }

  interface Database {
    loadSchema(): Promise<Schema>
  }
  export default class Config {
    constructor(appId: string, parseMount: string)

    database: Database;
  }
}
