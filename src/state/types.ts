export interface ApplicationStore {
  getState: () => ApplicationState;
}

export interface ApplicationState {
  user: { email: string };
}
