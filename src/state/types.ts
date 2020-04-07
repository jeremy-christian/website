export type ApplicationStore = {
  getState: () => ApplicationState;
};

export type ApplicationPage = "login" | "home" | "game" | "lobby";

export interface ApplicationUser {
  email: string;
}

export type ApplicationGame = { name: string };

export type ApplicationUI = {
  page: ApplicationPage;
  currentGame: ApplicationGame | null;
};
export interface ApplicationState {
  user: ApplicationUser | {};
  games: ApplicationGame[];
  ui: ApplicationUI;
}
