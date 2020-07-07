import React from "react";
import GameTable from "./GameTable";
import CreateGameButton from "./CreateGameButton";

const Home = ({ socket }: { socket: SocketIOClient.Socket }) => (
  <>
    <GameTable />
    <CreateGameButton socket={socket} />
  </>
);

export default Home;
