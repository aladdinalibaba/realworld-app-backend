import dotenv from 'dotenv';

dotenv.config();

export default {
  port: Number(process.env.SERVER_PORT),
};
