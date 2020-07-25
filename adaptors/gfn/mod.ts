import jsdom from "https://dev.jspm.io/jsdom";
import { Feed } from "../../models/Feed.ts";
import { Game, Action } from "./models/Game.ts";
import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
export * from "./utils.ts";

let REDIS_HOST = Deno.env.get("REDIS_HOST") || "127.0.0.1";
let REDIS_PORT = Deno.env.get("REDIS_PORT") || 6379;
let REDIS_PASSWORD = Deno.env.get("REDIS_PASSWORD");
const REDIS_URL = Deno.env.get("REDIS_URL");

if (REDIS_URL) {
  const { hostname, port, password } = new URL(REDIS_URL);
  REDIS_HOST = hostname;
  REDIS_PORT = port;
  REDIS_PASSWORD = password;
}

const redis = await connect({
  hostname: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
});

type GameList = Array<Feed<Game>>;

function extractData(document: any) {
  const data: GameList = new Array<Feed<Game>>();
  document.querySelectorAll(".changes.timeline-content").forEach(
    (element: any) => {
      data.push({
        date: element.querySelector("h4").textContent,
        games: Array.from(element.querySelectorAll("li")).map((
          li: any,
        ) => ({
          name: li.textContent,
          action: li.querySelector("span").classList.contains(
              "badge-success",
            )
            ? Action.Added
            : Action.Removed,
        })),
      });
    },
  );
  return data;
}

async function getNewestData(
  lastRun: string | undefined,
  games: GameList,
): Promise<GameList> {
  if (games.length > 0) {
    const [latest] = games;
    await redis.set("gfn:lastrun", latest.date);
  }
  for (let i = 0; i < games.length; i++) {
    const { date } = games[i];
    if (date == lastRun) {
      return games.slice(0, i);
    }
  }
  return games;
}

export default async function run() {
  const response = await fetch(
    "https://geforcenow-games.com/en/changelog",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
      },
    },
  );
  const body = await response.text();
  const RE = /(<img.*?\/>)/sg;

  // @ts-ignore
  const { document } = new jsdom.JSDOM(
    body.replaceAll(RE, ""),
    { url: "https://geforcenow-games.com/en/changelog" },
  ).window;
  const lastRun = await redis.get("gfn:lastrun");
  return getNewestData(lastRun, extractData(document));
}
