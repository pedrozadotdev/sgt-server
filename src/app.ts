import path from 'path';
import http from 'http';
import express, { Application } from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';

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

const appServer = http.createServer(app);

ParseServer.createLiveQueryServer(appServer);
export default appServer;
