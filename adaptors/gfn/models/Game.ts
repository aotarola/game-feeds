import { BaseGame } from "../../../models/BaseGame.ts";

export enum Action {
  Added = 1,
  Removed = 2,
  ComingSoon = 3,
}

export interface Game extends BaseGame {
  action: Action;
}
