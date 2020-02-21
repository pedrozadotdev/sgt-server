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
    allowClientClassCreation: boolean;
    enableAnonymousUsers: boolean;
    filesAdapter?: S3Adapter;
    cacheAdapter?: RedisCacheAdapter;
  }

  export class ParseServer {
    constructor(config: Config);
    static createLiveQueryServer(httpServer: http.Server): void;
  }

  interface S3Overrides {
    endpoint: string;
    s3ForcePathStyle: boolean;
    signatureVersion: string;
  }

  interface S3AdapterOptions {
    bucket: string;
    globalCacheControl: string;
    s3overrides: S3Overrides | {};
  }

  interface RedisCacheAdapterOptions {
    url: string;
  }

  export class S3Adapter {
    constructor(opts: S3AdapterOptions);
  }

  export class RedisCacheAdapter {
    constructor(opts: RedisCacheAdapterOptions);
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
    addClassIfNotExists<T>(
      className: string,
      fields: T,
      classLevelPermissions?: ClassPermission,
    ): Promise<void>;
    setPermissions(name: string, permissions?: ClassPermission): Promise<void>;
  }

  interface Database {
    loadSchema(): Promise<Schema>;
  }
  export default class Config {
    static get(appId: string): { database: Database };

    database: Database;
  }
}

declare module 'parse-server/lib/logger' {
  export default class Logger {
    static info(msg: string): void;
    static error(msg: string): void;
  }
}

declare module 'parse-server/lib/Adapters/Push/PushAdapter' {
  import { Installation } from 'parse/node';

  export interface PushAdapterResponse {
    err: string | null;
    device?: Installation;
    transmitted: boolean;
  }

  interface PushAdapterData {
    priority?: 'default' | 'normal' | 'high';
    alert: string;
    badge?: number | 'increment';
    title?: string;
    misc?: object;
  }

  export interface PushAdapterBody {
    data: PushAdapterData;
  }

  export default abstract class PushAdapter {
    send(
      body: PushAdapterBody,
      installations: Installation[],
    ): Promise<PushAdapterResponse[]>;
  }
}
