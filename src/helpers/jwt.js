import jwt from "jsonwebtoken";
import variables from "../variables";
import statusCodes from "./statusCodes";
import logger from "../logger";

const SECRET = variables.jwtSecret;
const EXPIRES_IN = parseInt(variables.jwtExpiresIn, 10);

function generateToken(payload = {}, expiresIn = EXPIRES_IN) {
  const token = jwt.sign({ ...payload }, SECRET, {
    expiresIn,
  });
  return {
    token,
    expiresIn,
  };
}

function verifyToken(ctx) {
  const token = ctx.req.headers['x-access-token'];
  if (!token){
    throw {
      status: 403, 
      title: "No token provided."
    }
  }  
  const error = {
    status: 401,
    title: "Invalided token or expired",
  };

  try {
    return jwt.verify(token, variables.jwtSecret, (err, decoded) => {
      if (err) {
        logger.error(err);
        throw error;
      }
      return decoded;
    });
  } catch (err) {
    throw error;
  }
}

export { generateToken, verifyToken };
