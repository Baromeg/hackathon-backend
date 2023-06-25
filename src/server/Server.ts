import { FastifyInstance, FastifyPluginOptions, RouteOptions } from "fastify";
import { IncomingMessage, Server as httpServer, ServerResponse } from "http";
import { plugin, pluginSet, router, routerSet } from "./serverTypes";

export class Server {
  private setOfRouters: routerSet;
  private setOfPlugins: pluginSet;
  private serverInstance: FastifyInstance<
    httpServer,
    IncomingMessage,
    ServerResponse
  >;

  constructor(
    server: FastifyInstance<httpServer, IncomingMessage, ServerResponse>,
    routerSet?: routerSet,
    pluginSet?: pluginSet
  ) {
    this.setOfRouters = routerSet ?? [];
    this.setOfPlugins = pluginSet ?? [];
    this.serverInstance = server;
  }

  public setEnvVariables(envParamsObject: { [key: string]: any }) {
    for (let envParamName in envParamsObject) {
      process.env[envParamName] = envParamsObject[envParamName];
    }
  }

  public registerPlugin(plugin: plugin) {
    this.setOfPlugins.push(plugin);
  }

  public registerRouter(router: router) {
    this.setOfRouters.push(router);
  }

  public registerPlugins() {
    this.setOfPlugins.forEach((plugin: plugin) => {
      this.serverInstance.register(plugin.pluginInstance, plugin.options);
    });
  }

  public registerApi() {
    this.registerPlugins();
    this.registerRouters();
  }

  public async initServer(port: number, host: string) {
    await this.serverInstance.listen({ port, host });
  }

  public async initLocalDatabase() {}

  public async autoFillTables() {}

  private registerRouters() {
    this.setOfRouters.forEach((router: router) => {
      let { routes, opts } = router;
      //routes = generalHook.applyGeneralHookRreSerialization(routes); // Applying cors here
      const plugin = (
        server: FastifyInstance,
        opts: FastifyPluginOptions,
        done: () => unknown
      ) => {
        routes.forEach((route: RouteOptions) => {
          server.route(route);
        });
        done();
      };
      this.serverInstance.register(plugin, opts);
    });
  }
}
