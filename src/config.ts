import dotenv from 'dotenv';

dotenv.config();

export default {
  port: Number(process.env.SERVER_PORT),
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  session: {
    name: process.env.SESSION_NAME || 'SSID',
    secret: process.env.SESSION_SECRET,
  },
};
