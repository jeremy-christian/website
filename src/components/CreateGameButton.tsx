import React, { useState, useCallback } from "react";
import { ApplicationStore } from "../state/types";
import { Modal, Button, Input } from "antd";

const CreateGameButton = ({
  socket,
  store
}: {
  socket: SocketIOClient.Socket;
  store: ApplicationStore;
}) => {
  const { user } = store.getState();

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [newGameName, setNewGameName] = useState("");

  const onChange = useCallback(e => setNewGameName(e.target.value), []);
  const onSubmit = useCallback(() => {
    console.log("emitting", newGameName);
    socket.emit("addGame", { name: newGameName, user });
    setVisible(false);
  }, [newGameName]);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
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

export default CreateGameButton;
