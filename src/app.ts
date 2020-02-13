import path from 'path';
import http from 'http';
import express, { Application } from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';

import initClasses from './classes/init';

import { filesAdapter, cacheAdapter } from './adapters';

const [appId, masterKey, serverURL] = [
  process.env.APP_ID || 'SGT',
  process.env.MASTER_KEY || 'defaultMasterKey',
  `http://localhost:${process.env.PORT || 1337}/api`,
];

const [app, api, dashboard] = [
  express(),
  new ParseServer({
    databaseURI: process.env.DATABASE_URI || `mongodb://db:27017/${appId}`,
    cloud: path.join(__dirname, 'cloud', 'main.js'),
    appId,
    masterKey,
    serverURL,
    liveQuery: {
      classNames: ['Routes'],
    },
    allowClientClassCreation: false,
    enableAnonymousUsers: false,
    filesAdapter,
    cacheAdapter,
  }),
  new ParseDashboard(
    {
      apps: [
        {
          serverURL,
          appId,
          appName: appId,
          masterKey,
          supportedPushLocales: ['en', 'pt'],
        },
      ],
      users: [
        {
          user: process.env.DASHBOARD_USERNAME || 'admin',
          pass: process.env.DASHBOARD_PASSWORD || 'pass',
        },
      ],
    },
    {
      allowInsecureHTTP: true,
    },
  ),
];

app.use('/api', api as Application);
app.use('/dashboard', dashboard as Application);

export const App = http.createServer(app);
export const InitClasses = async (): Promise<void> =>
  initClasses({ appId, serverURL, masterKey });

ParseServer.createLiveQueryServer(App);
