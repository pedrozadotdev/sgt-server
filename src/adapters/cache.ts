import { RedisCacheAdapter } from 'parse-server';

export default (): RedisCacheAdapter =>
  new RedisCacheAdapter({ url: process.env.REDIS_URL || 'redis://redis' });
