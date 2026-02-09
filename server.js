const io = require('socket.io')(3000, { cors: { origin: "*" } });
let players = {};

io.on('connection', (socket) => {
    players[socket.id] = { id: socket.id, snake: [], color: `hsl(${Math.random()*360}, 70%, 50%)` };
    
    socket.on('move', (data) => {
        if (players[socket.id]) {
            players[socket.id].snake = data.snake;
            socket.broadcast.emit('playerMoved', players[socket.id]);
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('removePlayer', socket.id);
    });
});
console.log("Server running on port 3000");
