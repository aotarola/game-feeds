import { GameList, Action } from "./models/Game.ts";

export function formatMessage(feed: GameList) {
  function toEmoji(action: Action) {
    switch (action) {
      case Action.Added:
        return "\u2705";

      case Action.Removed:
        return "\u274c";

      default:
        return "\u{1F389}";
    }
  }
  const dotRex = /\./gi;
  const dashRex = /-/gi;
  return feed.map(({ date, games }) =>
    `Geforce Now updates for **${date}**:\n${
      games.map(({ action, name }) =>
        `${toEmoji(action)} ${
          name
            .replaceAll(dashRex, "\\-")
            .replace("(", "\\(")
            .replace(")", "\\)")
            .replace("!", "\\!")
            .replaceAll(dotRex, "\\.")
        }`
      ).join("\n")
    }`
  ).join("\n");
}
