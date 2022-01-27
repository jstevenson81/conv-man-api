import { ApiServer } from "./http/ApiServer";

const server = new ApiServer();
(() => {
  server.startUp();
})();
