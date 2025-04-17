export function parseStyle(
  styleString?: string
): React.CSSProperties | undefined {
  if (!styleString || typeof styleString !== "string") return undefined;

  return styleString
    .split(";")
    .filter(Boolean)
    .reduce((acc: any, style) => {
      const [key, value] = style.split(":");
      if (key && value) {
        const formattedKey = key
          .trim()
          .replace(/-([a-z])/g, (_, char) => char.toUpperCase());
        acc[formattedKey] = value.trim();
      }
      return acc;
    }, {});
}
