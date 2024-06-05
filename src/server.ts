import { config } from "dotenv";
config();
import environments from "./shared/environments";
import app from "./shared/app";
import ClientRouter from "./modules/clients/infrastructure/api/routes/client.router";
import HarvestRouter from "./modules/harvests/infrastructure/api/routes/harvest.router";
async function init() {
  const version:string = environments.APP_VERSION;
  //correr routers
  await new app([
    new ClientRouter(version),
    new HarvestRouter(version),
  ], environments.APP_PORT).listen();
}
init();
