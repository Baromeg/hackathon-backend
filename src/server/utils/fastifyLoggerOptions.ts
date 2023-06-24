import { FastifyReply, FastifyRequest } from "fastify";

export default {
  transport: {
    level: "error",
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      colorize: true,
      destination: 2,
    },
  },
  serializers: {
    res(reply: FastifyReply) {
      return {
        statusCode: reply.statusCode,
      };
    },
    req(request: FastifyRequest) {
      return {
        method: request.method,
        url: request.url,
        path: request.routerPath,
        parameters: request.params,
        headers: request.headers,
      };
    },
  },
};
