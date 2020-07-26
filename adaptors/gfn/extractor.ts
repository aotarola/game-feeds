import { GameList, Action, Game } from "./models/Game.ts";
import { Feed } from "../../models/Feed.ts";
import { Cache } from "../../interfaces.ts";

export function extractData(document: any) {
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

export async function getNewestData(
  games: GameList,
  cache?: Cache,
): Promise<GameList> {
  if (!cache) {
    return games;
  }
  const lastRun = await cache.get("gfn:lastrun");

  if (games.length > 0) {
    const [latest] = games;
    await cache.set("gfn:lastrun", latest.date);
  }
  for (let i = 0; i < games.length; i++) {
    const { date } = games[i];
    if (date == lastRun) {
      return games.slice(0, i);
    }
  }
  return games;
}
