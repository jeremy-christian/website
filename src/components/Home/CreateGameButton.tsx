import React, { useState, useCallback } from "react";
import { ApplicationState, ApplicationUser } from "../../state/types";
import { Modal, Button, Input } from "antd";
import { connect } from "react-redux";

const mapStateToProps = (
  state: ApplicationState,
  ownProps: { socket: SocketIOClient.Socket }
) => {
  return {
    user: state.user,
    socket: ownProps.socket,
  };
};

const ConnectedButton = ({
  user,
  socket,
}: {
  user: {} | ApplicationUser;
  socket: SocketIOClient.Socket;
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [newGameName, setNewGameName] = useState("");

  const onChange = useCallback((e) => setNewGameName(e.target.value), []);
  const onSubmit = useCallback(() => {
    console.log("emitting", newGameName);
    socket.emit("addGame", { name: newGameName, user });
    setVisible(false);
  }, [newGameName]);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Game
      </Button>
      <Modal
        title="Create New Game"
        visible={visible}
        onOk={onSubmit}
        onCancel={handleCancel}
      >
        <p>Set Game Name</p>
        <Input
          onPressEnter={onSubmit}
          value={newGameName}
          onChange={onChange}
        ></Input>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps)(ConnectedButton);
