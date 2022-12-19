import io from 'socket.io-client';
// const sockets = io('https://localhost:3001', { autoConnect: true, forceNew: true });
const sockets = io('/');
export default sockets;
