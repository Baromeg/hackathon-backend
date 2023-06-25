import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import { Server } from "./server/Server";
import fastifyLoggerOptions from "./server/utils/fastifyLoggerOptions";
import fastifyCorsOptions from "./server/utils/fastifyCorsOptions";

// Controllers
import * as langModelRouter from "./modules/lang/routers/lang.router";

const server = new Server(
  fastify({
    logger: fastifyLoggerOptions,
  })
);

server.registerRouter(langModelRouter);

server.registerPlugin({
  pluginInstance: fastifyCors,
  options: fastifyCorsOptions,
});

server.registerApi();

export default server;
