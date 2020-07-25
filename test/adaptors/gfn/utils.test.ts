import { formatMessage } from "../../../adaptors/gfn/utils.ts";
import { Action } from "../../../adaptors/gfn/models/Game.ts";
import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("return empty string for empty game feed", () =>
  assertEquals(formatMessage([]), ""));

Deno.test("return message with ✅ when for a game is added", () => {
  const gamesFeed = [{
    date: "some date",
    games: [{
      action: Action.Added,
      name: "some game",
    }],
  }];
  assertEquals(
    formatMessage(gamesFeed),
    "Geforce Now updates for **some date**:\n✅ some game",
  );
});

Deno.test("return message with ❌ when for a game is removed", () => {
  const gamesFeed = [{
    date: "some date",
    games: [{
      action: Action.Removed,
      name: "some game",
    }],
  }];
  assertEquals(
    formatMessage(gamesFeed),
    "Geforce Now updates for **some date**:\n❌ some game",
  );
});

Deno.test("return message with 🎉 when for a game is coming soon", () => {
  const gamesFeed = [{
    date: "some date",
    games: [{
      action: Action.ComingSoon,
      name: "some game",
    }],
  }];
  assertEquals(
    formatMessage(gamesFeed),
    "Geforce Now updates for **some date**:\n🎉 some game",
  );
});
