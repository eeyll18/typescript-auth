export function parseTime(timeStr: string): number | undefined {
  const match = timeStr.match(/^(\d+)([smhd])$/);
  if (!match) return undefined; 

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 60 * 60 * 24;
    default:
      return undefined;
  }
}
