declare module 'parse-server' {
  import http from 'http';
  interface LiveQueryConfig {
    classNames: string[];
  }

  interface Config {
    databaseURI: string;
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

declare module 'parse-dashboard' {
  interface App {
    serverURL: string;
    appId: string;
    masterKey: string;
  }

  interface User {
    user: string;
    pass: string;
  }

  interface Config {
    apps: App[];
    users: User[];
    useEncryptedPasswords?: boolean;
  }

  export default class ParseServer {
    constructor(config: Config)
  }
}
