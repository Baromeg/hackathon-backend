import fastify from "fastify";

import { Server } from "./server/Server";
import fastifyLoggerOptions from "./server/utils/fastifyLoggerOptions";

// Controllers
import * as langModelRouter from "./modules/lang/routers/lang.router";

const server = new Server(
  fastify({
    logger: fastifyLoggerOptions,
  })
);

server.registerRouter(langModelRouter);

server.registerPlugins();
server.registerApi();

export default server;
