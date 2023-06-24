import server from "./server";
import _CONFIG from "./config";
(async () => {
  await server.initServer(_CONFIG.server.port, _CONFIG.server.host);
  // await server.initLocalDatabase();
  // await server.autoFillTables();
  console.log("Log of Env", process.env);
})();
