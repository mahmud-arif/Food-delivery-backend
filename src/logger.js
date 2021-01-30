import bunyan from "bunyan";

import variables from "./variables";

const loggerConfig = {
  name: variables.loggerName,
  streams: [
    {
      type: "stream",
      stream: process.stdout,
      level: variables.logLevel
    }
  ]
};

const logger = bunyan.createLogger(loggerConfig);

export default logger;
