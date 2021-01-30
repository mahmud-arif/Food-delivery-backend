import { v4 as uuidV4 } from "uuid";

function requestId(options = {}) {
  const {
    header = "X-Request-Id",
    propertyName = "reqId",
    generator = uuidV4,
  } = options;

  return (ctx, next) => {
    const reqId = ctx.request.get(header) || generator();
    ctx[propertyName] = reqId;
    ctx.set(header, reqId);
    return next();
  };
}

export default requestId;
