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
    allowInsecureHTTP: boolean;
  }

  export default class ParseDashboard {
    constructor(config: Config, securityConfig: SecurityConfig);
  }
}
