import path from 'path';
import http from 'http';
import express, { Application } from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';

const [appId, masterKey] = [
  process.env.APP_ID || 'SGT',
  process.env.MASTER_KEY || 'defaultMasterKey',
];

const [app, api, dashboard] = [
  express(),
  new ParseServer({
    databaseURI: process.env.DATABASE_URI || `mongodb://db:27017/${appId}`,
    cloud: path.join(__dirname, 'cloud', 'main.js'),
    appId,
    masterKey,
    liveQuery: {
      classNames: ['Routes'],
    },
  }),
  new ParseDashboard({
    apps: [
      {
        serverURL: 'http://localhost:1337/api',
        appId,
        masterKey,
      },
    ],
    users: [
      {
        user: process.env.DASHBOARD_USERNAME || 'admin',
        pass: process.env.DASHBOARD_PASSWORD || 'pass',
      },
    ],
  }),
];

app.use('/api', api as Application);
app.use('/dashboard', dashboard as Application);

const appServer = http.createServer(app);

ParseServer.createLiveQueryServer(appServer);
export default appServer;
