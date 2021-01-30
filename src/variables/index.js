require("dotenv").config();

const appHost = process.env.HOST || "localhost";
const appEnv = process.env.APP_ENV;
const appPort = process.env.APP_PORT;
const logLevel = process.env.LOG_LEVEL || "debug";
const loggerName = process.env.LOGGER_NAME;

const saltRounds = process.env.SALT_ROUNDS;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
const jwtSecret = process.env.JWT_SECRET;
const emailVerificationDuration = process.env.EMAIL_VERIFICATION_DURATION;
const passwordResetDuration = process.env.PASSWORD_RESET_DURATION;

const mongoURI = process.env.MONGO_URI;

export default {
  appEnv,
  appHost,
  appPort,
  logLevel,
  loggerName,
  saltRounds,
  jwtExpiresIn,
  jwtSecret,
  emailVerificationDuration,
  passwordResetDuration,
  mongoURI
};
