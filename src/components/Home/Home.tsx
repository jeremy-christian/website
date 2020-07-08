import React from "react";
import GameTable from "./GameTable";
import CreateGameButton from "./CreateGameButton";

export const Home = ({ socket }: { socket: SocketIOClient.Socket }) => (
  <>
    <GameTable />
  </>
);

export const HomeFooter = CreateGameButton;
