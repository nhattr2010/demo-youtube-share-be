import { registerAs } from '@nestjs/config';

export const CONFIG_DATABASE = 'database';

export default registerAs(CONFIG_DATABASE, () => ({
  uri: process.env.DATABASE_URL,
}));
