import React, { useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";
import { PageHeader, Button, Spin, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import io from "socket.io-client";
import { createStore } from "redux";
import reducers from "./state/reducers";
import { setUser, setGames } from "./state/actions";
import LoginModal from "./components/LoginModal";
import { Centered } from "./components/ApplicationLayout";
import Home from "./components/Home/Home";
import { ApplicationGame } from "./state/types";
import { Provider } from "react-redux";
// define store
const store = createStore(reducers);
// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
store.subscribe(() => console.log(store.getState()));

const socket = io.connect("http://localhost:8000");

function App() {
  socket.on("pushGames", (games: ApplicationGame[]) => {
    store.dispatch(setGames(games));
  });

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user,
  } = useAuth0();

  useEffect(() => {
    if (user) {
      store.dispatch(setUser(user));
    }
  });

  if (loading) {
    return (
      <Centered>
        <Spin size="large" tip="Loading..." />
      </Centered>
    );
  }

  if (!isAuthenticated) {
    return <LoginModal callback={loginWithRedirect} />;
  }

  const LogoutButton = (
    <Button key={1} onClick={() => logout()} type="primary">
      Log Out
    </Button>
  );

  return (
    <Provider store={store}>
      <PageHeader ghost={false} title="Games" extra={[LogoutButton]} />
      <Home socket={socket} />
    </Provider>
  );
}

export default App;
