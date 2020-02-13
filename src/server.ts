import logger from 'parse-server/lib/logger';
import { App, InitClasses } from './app';

App.listen(process.env.PORT || 1337, async () => {
  await InitClasses();
  logger.info(`⚡️ Server listening on port ${process.env.PORT || 1337}!`);
});
