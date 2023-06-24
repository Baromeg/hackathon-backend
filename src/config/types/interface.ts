export enum NodeEnvTypes {
  prod = "prod",
  dev = "dev",
}
export type NodeEnv = keyof typeof NodeEnvTypes;

interface IServerConfig {
  host: string;
  port: number;
}

interface IDBConfig {
  user: string;
  database: string;
  password: string;
  port: number;
  host: string;
}

export interface IConfig {
  nodeEnv: NodeEnv;
  server: IServerConfig;
  db: IDBConfig;
}
