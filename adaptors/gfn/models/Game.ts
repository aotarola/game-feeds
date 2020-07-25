import { BaseGame } from "../../../models/BaseGame.ts";
import { Feed } from "../../../models/Feed.ts";

export type GameList = Array<Feed<Game>>;

export enum Action {
  Added = 1,
  Removed = 2,
  ComingSoon = 3,
}

export interface Game extends BaseGame {
  action: Action;
}
