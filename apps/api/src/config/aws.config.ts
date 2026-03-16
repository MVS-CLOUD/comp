import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const awsConfigSchema = z.object({
  region: z.string().default('us-east-1'),
  accessKeyId: z.string().optional().default(''),
  secretAccessKey: z.string().optional().default(''),
  bucketName: z.string().optional().default(''),
  endpoint: z.string().optional(),
});

export type AwsConfig = z.infer<typeof awsConfigSchema>;

export const awsConfig = registerAs('aws', (): AwsConfig => {
  const config = {
    region: process.env.APP_AWS_REGION || 'us-east-1',
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY || '',
    bucketName: process.env.APP_AWS_BUCKET_NAME || '',
    endpoint: process.env.APP_AWS_ENDPOINT || '',
  };

  const result = awsConfigSchema.safeParse(config);

  if (!result.success) {
    console.warn(
      `AWS configuration incomplete — S3 features will be disabled: ${result.error.issues
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ')}`,
    );
    return config as AwsConfig;
  }

  return result.data;
});
