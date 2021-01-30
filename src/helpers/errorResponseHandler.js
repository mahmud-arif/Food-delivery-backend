import stringifySafe from "./stringifySafe";

export default function errorResponseHandler(ctx, err) {
  const { status, title = null, errors = null, request = {}, data = {} } = err;
  const instance =
    request && request.path !== undefined ? request.path : ctx.request.url;
  let errorTitle;

  switch (status) {
    case 400:
      ctx.log.error(stringifySafe(err, null, 2));
      ctx.response.badRequest(
        null,
        errors ||
          data.errors || {
            title: title || "Bad Request",
            instance
          }
      );
      break;
    case 401:
      ctx.log.fatal(stringifySafe(err, null, 2));
      ctx.response.unauthorized(null, {
        title: title || "Authentication Failed",
        instance
      });
      break;
    case 404:
      ctx.log.error(stringifySafe(err, null, 2));
      ctx.response.notFound(null, {
        title: title || "Resource Not found",
        instance
      });
      break;
    case 503:
      errorTitle =
        title ||
        (err.source !== undefined
          ? `${err.source} unavailable`
          : "Service unavailable");
      ctx.log.error(stringifySafe(err, null, 2));
      ctx.response.serviceUnavailable(null, {
        title: errorTitle,
        instance
      });
      break;
    default:
      errorTitle =
        title ||
        (err.source !== undefined
          ? `${err.source} Internal Error`
          : "Internal Error");
      ctx.log.error(stringifySafe(err, null, 2));
      ctx.response.internalServerError(null, {
        title: errorTitle,
        instance
      });
  }
}
