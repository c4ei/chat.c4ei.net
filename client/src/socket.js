import io from 'socket.io-client';
// const sockets = io('https://localhost:3001', { autoConnect: true, forceNew: true });
// const sockets = io('/');
const sockets = io("https://chat.c4ei.net", {
  path: "/chat/"
});

export default sockets;
