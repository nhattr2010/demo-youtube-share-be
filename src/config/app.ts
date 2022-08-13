import { registerAs } from '@nestjs/config';

export const CONFIG_APP = 'app';

export default registerAs(CONFIG_APP, () => ({
  name: String(process.env.APP_NAME),
  version: String(process.env.APP_VERSION),
  host: String(process.env.APP_HOST),
  port: Number(process.env.APP_PORT),
}));
