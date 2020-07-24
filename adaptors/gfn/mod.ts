import jsdom from "https://dev.jspm.io/jsdom";
import { Feed } from "../../models/Feed.ts";
import { Game, Action } from "./models/Game.ts";

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

function getNewestData(lastKownDate: string, games: GameList): GameList {
  for (let i = 0; i < games.length; i++) {
    const { date } = games[i];
    if (date == lastKownDate) {
      return games.slice(0, i);
    }
  }
  return games;
}

export default async function run(lastKownDate: string) {
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
  return getNewestData(lastKownDate, extractData(document));
}
