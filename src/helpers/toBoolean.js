export default function toBoolean(value) {
  const input = `${value}`.toLowerCase();

  if (input === "true" || input === "1" || input === "yes" || input === "y") {
    return true;
  }

  if (input === "false" || input === "0" || input === "no" || input === "n") {
    return false;
  }

  return value;
}
