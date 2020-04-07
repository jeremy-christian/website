import { ApplicationUser, ApplicationGame, ApplicationPage } from "./types";

export interface SetUserAction {
  type: "SET_USER";
  user: ApplicationUser;
}

export function setUser(user: ApplicationUser): SetUserAction {
  return { type: "SET_USER", user };
}

export interface SetGamesAction {
  type: "SET_GAMES";
  games: ApplicationGame[];
}

export function setGames(games: ApplicationGame[]): SetGamesAction {
  return { type: "SET_GAMES", games };
}

export interface SetPageAction {
  type: "SET_PAGE";
  page: ApplicationPage;
}

export function setPage(page: ApplicationPage): SetPageAction {
  return { type: "SET_PAGE", page };
}

export interface SetActiveGameAction {
  type: "SET_ACTIVE_GAME";
  game: ApplicationGame;
}

export function setActiveGame(game: ApplicationGame): SetActiveGameAction {
  return { type: "SET_ACTIVE_GAME", game };
}

export type SetUIAction = SetPageAction | SetActiveGameAction;
