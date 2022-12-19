var express = require('express');
var router = express.Router();
var path = require('path');
const http = require('http').createServer(router);
const io = require('socket.io')(http);
// const PORT = process.env.PORT || 3001;
// const cors = require("cors");
// var corsOptions = {
//     origin: "https://localhost:3001" //클라이언트(react) 쪽의 콜스 허용
// };
// router.use(cors(corsOptions));
// const bodyParser = require("body-parser");
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(cors());
// router.use(bodyParser.json());

router.use('/', express.static( path.join(__dirname, '../client/build') ))
router.get('/', function(req, res){
  res.sendFile( path.join(__dirname, '../client/build/index.html') )
})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// ########## region
// Route
router.get('/ping', (req, res) => {
  res
    .send({
      success: true,
    })
    .status(200);
});

// Socket
io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id} `+getCurTimestamp());

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('User disconnected: '+socket.id+' '+getCurTimestamp());
  });

  socket.on('BE-check-user', ({ roomId, userName }) => {
    let error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (socketList[client] == userName) {
          error = true;
        }
      });
      socket.emit('FE-error-user-exist', { error });
    });
  });

  /**
   * Join Room
   */
  socket.on('BE-join-room', ({ roomId, userName }) => {
    // Socket Join RoomName
    socket.join(roomId);
    socketList[socket.id] = { userName, video: true, audio: true };

    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ userId: client, info: socketList[client] });
        });
        socket.broadcast.to(roomId).emit('FE-user-join', users);
        // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-send-message', ({ roomId, msg, sender }) => {
    io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
  });

  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });
});

// ########## endregion

// function getCurTimestamp() {
//   const d = new Date();

//   return new Date(
//     Date.UTC(
//       d.getFullYear(),
//       d.getMonth(),
//       d.getDate(),
//       d.getHours(),
//       d.getMinutes(),
//       d.getSeconds()
//     )
//   // `toIsoString` returns something like "2017-08-22T08:32:32.847Z"
//   // and we want the first part ("2017-08-22")
//   ).toISOString().replace('T','_').replace('Z','');
// }

////////////////////////////////////////////////////////////////////////
// http.listen(PORT, () => {
//   console.log('Server Start port : ['+PORT +'] '+getCurTimestamp());
// });

module.exports = router;
