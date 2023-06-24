import { IConfig, NodeEnv } from "../types/interface";

const appProdConfig: IConfig = {
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  server: {
    host: process.env.SERVER_HOST,
    port: Number(process.env.SERVER_PORT),
  },
  db: {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
  },
};

export default appProdConfig;
