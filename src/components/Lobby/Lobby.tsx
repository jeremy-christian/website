import React from "react";
import { Table, Button } from "antd";
import { ApplicationState, ApplicationGame } from "../../state/types";
import { connect } from "react-redux";
import { Socket } from "socket.io-client";
const mapStateToProps = (
  state: ApplicationState,
  ownProps: { socket: SocketIOClient.Socket }
) => {
  return {
    game: state.ui.currentGame,
    socket: ownProps.socket,
  };
};

const columns = [
  {
    title: "Name",
    dataIndex: "email",
    key: "email",
  },
];

const Lobby = ({
  socket,
  game,
}: {
  socket: SocketIOClient.Socket;
  game: ApplicationGame | null;
}) => {
  const onDeleteGame = () => socket.emit("removeGame", { game });

  const RemoveGameButton = () => (
    <Button onClick={onDeleteGame}>Delete Game</Button>
  );

  return (
    <>
      <p>{game?.name}</p>
      <Table columns={columns} dataSource={game?.players} />
      <RemoveGameButton />
    </>
  );
};
export default connect(mapStateToProps)(Lobby);
