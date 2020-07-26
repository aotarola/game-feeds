import { extractData, getNewestData } from "../../../adaptors/gfn/extractor.ts";
import {
  testing,
} from "../../../deps.ts";

const { assertEquals } = testing;

Deno.test("extractData: return empty list when no match is found", () => {
  const fakeDOM = {
    querySelectorAll() {
      return [];
    },
  };
  assertEquals(
    extractData(fakeDOM),
    [],
  );
});

Deno.test("extractData: return object with data when match is found", () => {
  const fakeDOM = {
    querySelectorAll() {
      return [{
        querySelector() {
          return {
            textContent: "Kitten Date",
          };
        },
        querySelectorAll() {
          return [{
            textContent: "Awesome Game",
            querySelector() {
              return {
                classList: {
                  contains() {
                    return true;
                  },
                },
              };
            },
          }];
        },
      }];
    },
  };
  assertEquals(
    extractData(fakeDOM),
    [{ date: "Kitten Date", games: [{ name: "Awesome Game", action: 1 }] }],
  );
});

Deno.test("getNewestData: return same list if no cache is present", async () => {
  const gamesFeed = [
    { date: "Kitten Date", games: [{ name: "Awesome Game", action: 1 }] },
  ];
  assertEquals(
    await getNewestData(gamesFeed),
    gamesFeed,
  );
});

Deno.test("getNewestData: return newest data only", async () => {
  const gamesFeed = [
    { date: "New Kitten Date", games: [{ name: "Awesome Game", action: 1 }] },
    { date: "Old Kitten Date", games: [{ name: "Awesome Game", action: 1 }] },
  ];
  const cache = {
    get(k: string) {
      return Promise.resolve("Old Kitten Date");
    },
    set(k: string, v: string) {
      return Promise.resolve("ok");
    },
  };
  assertEquals(
    await getNewestData(gamesFeed, cache),
    [
      { date: "New Kitten Date", games: [{ name: "Awesome Game", action: 1 }] },
    ],
  );
});
