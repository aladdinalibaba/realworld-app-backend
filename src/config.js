import dotenv from 'dotenv';

dotenv.config();

export default {
  port: Number(process.env.SERVER_PORT),
  session: {
    name: process.env.SESSION_NAME || 'SSID',
    secret: process.env.SESSION_SECRET,
  },
};
