import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { hookHandler, hookHandlerAsync } from "./hookTypes";

// Used for cors 
class GeneralHook {
  private applyHook(
    routes: RouteOptions[],
    hookMethodObj: { [key: string]: hookHandler | hookHandlerAsync }
  ) {
    routes = routes.map((route: RouteOptions) => {
      return {
        ...route,
        ...hookMethodObj,
      };
    });
    return routes;
  }

  public applyGeneralHookRreSerialization(routes: RouteOptions[]) {
    return this.applyHook(routes, {
      onRequest: function (req: FastifyRequest, rep: FastifyReply, done: any) {
        rep.header("Access-Control-Allow-Origin", "*");
        rep.header("Access-Control-Allow-Methods", "*");
        rep.header("Access-Control-Allow-Credentials", "true");
        rep.header("Access-Control-Allow-Headers", "*");
        done();
      },
    });
  }
}

export default new GeneralHook();
