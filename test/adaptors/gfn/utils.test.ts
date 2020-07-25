import { formatMessage } from "../../../adaptors/gfn/utils.ts";
import { Action } from "../../../adaptors/gfn/models/Game.ts";
import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("return empty string for empty game feed", () =>
  assertEquals(formatMessage([]), ""));

[
  { action: Action.Added, emoji: "✅" },
  { action: Action.Removed, emoji: "❌" },
  { action: Action.ComingSoon, emoji: "🎉" },
].forEach(({ action, emoji }) => {
  Deno.test(`return message with ${emoji}`, () => {
    const gamesFeed = [{
      date: "some date",
      games: [{
        action,
        name: "some game",
      }],
    }];
    assertEquals(
      formatMessage(gamesFeed),
      `Geforce Now updates for **some date**:\n${emoji} some game`,
    );
  });
});

Deno.test("return message with special charactered escaped", () => {
  const gamesFeed = [{
    date: "some date",
    games: [{
      action: Action.Added,
      name: "some game!. (some digital store)",
    }],
  }];
  assertEquals(
    formatMessage(gamesFeed),
    "Geforce Now updates for **some date**:\n✅ some game\\!\\. \\(some digital store\\)",
  );
});
