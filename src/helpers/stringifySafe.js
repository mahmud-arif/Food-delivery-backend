import util from "util";

export default function stringifySafe(obj, replacer = null, space = 0) {
  return JSON.stringify(util.inspect(obj), replacer, space);
}
