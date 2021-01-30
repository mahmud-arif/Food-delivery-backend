import app from "./app";
import variables from "./variables";
import logger from "./logger";

const server = app.listen(variables.appPort, () => {
  logger.info(
    `API server listening on port ${variables.appPort}, in ${variables.appEnv}`
  );
});

module.exports = server;
