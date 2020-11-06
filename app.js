var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use('/image', express.static('image'))
app.use('/js', express.static('js'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/draw.html');
});



io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
  });
  socket.on('chat image', function (msg) {

    io.emit('chat image', msg);
  });
  socket.on('chat svg', function (msg) {
    io.emit('chat svg', msg);
  });
  socket.on('chat svgLine', function (msg) {
    io.emit('chat svgLine', msg);
  });
});


http.listen(3001, () => {
  console.log('listening on *:3000');
});