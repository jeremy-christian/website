import React, { useState } from "react";
import { useAuth0 } from "./react-auth0-spa";
import { PageHeader, Button, Spin, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import CreateGameButton from "./components/CreateGameButton";
import io from "socket.io-client";
import { createStore } from "redux";
import todoApp from "./state/reducers";
import { setUser } from "./state/actions";
import LoginModal from "./components/LoginModal";

// define store
const store = createStore(todoApp);
// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
store.subscribe(() => console.log(store.getState()));

const socket = io.connect("http://localhost:8000");

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Players",
    dataIndex: "players",
    key: "players",
    render: (players: string[]) => players.join(", ")
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner"
  }
];

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [games, setGames] = useState([] as Record<string, any>[]);
  socket.on("pushGames", (currentGames: Record<string, any>[]) => {
    setGames(currentGames);
  });

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user
  } = useAuth0();

  if (user) {
    store.dispatch(setUser(user));
  }

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

  const LogoutButton = () => (
    <Button key={1} onClick={() => logout()} type="primary">
      Log Out
    </Button>
  );

  return (
    <>
      <PageHeader ghost={false} title="Games" extra={[LogoutButton]} />
      <Table columns={columns} dataSource={games} />
      <CreateGameButton socket={socket} store={store} />
    </>
  );
}

export default App;
