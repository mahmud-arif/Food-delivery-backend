import useragent from "useragent";

function agentSerializer(userAgent) {
  const agent = useragent.parse(userAgent);
  return {
    browser: agent.toAgent(),
    os: agent.os.toString(),
    device: agent.device.toString(),
  };
}

function ips(ctx) {
  const header = ctx.get("X-Forwarded-For");
  return header ? header.split(/\s*,\s*/) : [];
}

function reqSerializer(ctx = {}) {
  const forwardedForIps = ips(ctx);
  return {
    method: ctx.method,
    url: ctx.url,
    ip: forwardedForIps[0] || ctx.ip,
    headers: ctx.headers,
    protocol: ctx.protocol,
    query: ctx.query,
    body: ctx.body,
  };
}

function resSerializer(ctx = {}) {
  return {
    statusCode: ctx.status,
    responseTime: ctx.responseTime,
    headers: (ctx.response || {}).headers,
  };
}

function logRequest(ctx, agent) {
  switch (ctx.method) {
    case "GET":
      ctx.log.info({ req: ctx, agent, event: "request" }, "request start");
      break;
    case "POST":
    case "PUT":
    case "PATCH":
      ctx.log.info(
        { req: ctx, agent, event: "request", body: ctx.request.body },
        "request start"
      );
      break;
    default:
      ctx.log.info({ req: ctx, agent, event: "request" }, "request start");
  }
}

function logResponse(ctx) {
  if (ctx.res.statusCode >= 200 && ctx.res.statusCode < 300) {
    ctx.log.info(
      { res: ctx, event: "response", body: ctx.response.body },
      "request end"
    );
  } else if (ctx.res.statusCode === 500) {
    ctx.log.error(
      { res: ctx, event: "response", body: ctx.response.body },
      "request end"
    );
  } else {
    ctx.log.warn(
      { res: ctx, event: "response", body: ctx.response.body },
      "request end"
    );
  }
}

function log(options = {}) {
  const { logger = null } = options;

  if (!logger) throw new TypeError("Logger required");

  return async (ctx, next) => {
    const startTime = new Date();
    ctx.log = logger.child({ reqId: ctx.reqId });
    ctx.log.addSerializers({
      req: reqSerializer,
      res: resSerializer,
      agent: agentSerializer,
    });
    if (ctx.appCtx) {
      ctx.appCtx.setLogger(logger);
    }
    const requestUserAgent =
      ctx.req.headers["user-agent"] || "No-User-Agent-Header";
    if (
      requestUserAgent.indexOf("HealthChecker") < 0 &&
      requestUserAgent.indexOf("Ruby") < 0
    ) {
      // Don't log Health checker and shitty AWS worker checker with user agent = Ruby
      const agent = ctx.get("User-Agent");

      logRequest(ctx, agent);

      await next();

      ctx.responseTime = new Date() - startTime;

      logResponse(ctx);
    } else {
      await next();
    }
  };
}

export default log;
