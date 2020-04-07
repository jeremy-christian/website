import { combineReducers } from "redux";
import { ApplicationUI } from "./types";
import { SetUserAction, SetGamesAction, SetUIAction } from "./actions";

const user = (user = {}, action: SetUserAction) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    default:
      return user;
  }
};

const games = (games = [], action: SetGamesAction) => {
  switch (action.type) {
    case "SET_GAMES":
      return action.games;
    default:
      return games;
  }
};

const ui = (ui: ApplicationUI, action: SetUIAction) => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...ui, page: action.page };
    case "SET_ACTIVE_GAME":
      return { ...ui, currentGame: action.game };
    default:
      return { page: "home", currentGame: null };
  }
};

const reducers = combineReducers({
  user,
  games,
  ui,
});

export default reducers;
