import { IConfig } from "../types/interface";

const appDevConfig: IConfig = {
  nodeEnv: "dev",
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  db: {
    user: "test",
    password: "12345",
    host: "localhost",
    database: "template",
    port: 5432,
  },
} as const;

export default appDevConfig;
