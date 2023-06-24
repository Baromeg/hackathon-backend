import { IConfig } from "./types/interface";

const env = process.env.NODE_ENV || "dev";

const _CONFIG: IConfig = require(`./env/${env}`).default;

if (!_CONFIG) {
  throw new Error("Config for given NODE_ENV was not found");
}

export default _CONFIG;
