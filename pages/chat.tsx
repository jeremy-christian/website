import React, { useState, useCallback } from "react";
import { Button, Input } from "antd";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const Message = () => {
  const [message, setMessage] = useState("");

  const onChange = useCallback(e => setMessage(e.target.value), []);
  const onSubmit = useCallback(() => {
    console.log(message);
    socket.emit("message", message);
  }, [message]);

  return (
    <div>
      <Input
        onPressEnter={onSubmit}
        value={message}
        onChange={onChange}
      ></Input>
      <Button onClick={onSubmit}>Send</Button>
    </div>
  );
};

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  socket.on("pushMessages", messages => {
    setMessages(messages);
  });
  return (
    <>
      <Message />
      {messages.map((message, i) => (
        <div key={i}>{message}</div>
      ))}
    </>
  );
};

export default ChatRoom;
