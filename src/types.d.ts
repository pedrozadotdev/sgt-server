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

declare module 'parse-dashboard' {
  interface App {
    serverURL: string;
    appId: string;
    appName?: string;
    masterKey: string;
    supportedPushLocales: string[];
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

  interface SecurityConfig {
    allowInsecureHTTP: boolean
  }

  export default class ParseDashboard {
    constructor(config: Config, securityConfig: SecurityConfig)
  }
}
