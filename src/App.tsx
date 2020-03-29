import React, { useState } from "react";
import { useAuth0 } from "./react-auth0-spa";
import { PageHeader, Button, Spin, Card, Table } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import CreateModalButton from "./components/CreateGameButton";
import io from "socket.io-client";

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
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  if (loading) {
    return (
      <Centered>
        <Spin size="large" tip="Loading..." />
      </Centered>
    );
  }

  if (!isAuthenticated) {
    return (
      <Centered>
        <Card title="You are unauthenticated" style={{ width: 300 }}>
          <p>
            Please click the button below to log in. (Powered by&nbsp;
            <a href="https://auth0.com/">auth0</a>.)
          </p>
          <p>
            <div>
              <Button type="primary" onClick={() => loginWithRedirect()}>
                Log In
              </Button>
            </div>
          </p>
        </Card>
      </Centered>
    );
  }

  return (
    <>
      <PageHeader
        ghost={false}
        title="Games"
        extra={[
          <Button key={1} onClick={() => logout()} type="primary">
            Log Out
          </Button>
        ]}
      >
        <Table columns={columns} dataSource={games} />
      </PageHeader>
      <CreateModalButton socket={socket} />
    </>
  );
}

export default App;
