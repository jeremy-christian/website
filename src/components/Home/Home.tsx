import React from "react";
import GameTable from "./GameTable";
import CreateGameButton from "./CreateGameButton";
import { ApplicationStore } from "../../state/types";

const Home = ({
  socket,
  store,
}: {
  socket: SocketIOClient.Socket;
  store: ApplicationStore;
}) => (
  <>
    <GameTable store={store} />
    <CreateGameButton store={store} socket={socket} />
  </>
);

export default Home;
