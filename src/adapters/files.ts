import { S3Adapter } from 'parse-server';

const s3overrides = process.env.S3_ENDPOINT
  ? {
      endpoint: process.env.S3_ENDPOINT,
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    }
  : {};

export default (): S3Adapter =>
  new S3Adapter({
    bucket: process.env.S3_BUCKET || 'sgt',
    globalCacheControl: 'public, max-age=31536000',
    s3overrides,
  });
