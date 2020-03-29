import io from "socket.io-client";

export const getSocket = () => {
  const socket = io.connect("http://localhost:8000");
  socket.on("error", function (err) {
    console.log("received socket error:");
    console.log(err);
  });
  return socket;
};

export const registerHandler = (socket, onMessageReceived) => {
  socket.on("message", onMessageReceived);
};

export const unregisterHandler = socket => {
  socket.off("message");
};

export const register = (socket, name, cb) => {
  socket.emit("register", name, cb);
};

export const join = (socket, chatroomName, cb) => {
  socket.emit("join", chatroomName, cb);
};

export const leave = (socket, chatroomName, cb) => {
  socket.emit("leave", chatroomName, cb);
};

export const message = (socket, chatroomName, msg, cb) => {
  socket.emit("message", { chatroomName, message: msg }, cb);
};

export const getChatrooms = (socket, cb) => {
  socket.emit("chatrooms", null, cb);
};

export const getAvailableUsers = (socket, cb) => {
  socket.emit("availableUsers", null, cb);
};
