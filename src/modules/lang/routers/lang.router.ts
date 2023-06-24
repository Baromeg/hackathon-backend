import * as controller from "../controllers/lang.controller";
import { RouteOptions, RegisterOptions } from "fastify";

export const opts: RegisterOptions = {
  prefix: "/api",
};

export const routes: RouteOptions[] = [
  {
    method: "POST",
    url: "/prompt",
    handler: controller.langChainEndpoint,
  },
];
