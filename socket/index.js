const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let activeUsers = []

io.on("connection", (socket) => {
    
    // Add new user
    socket.on('new-user-add', (newUserId) => {

        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId))
        {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log("Conneted users", activeUsers)
        io.emit('get-users', activeUsers)
    })

    // Disconnect user
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        io.emit('get-users', activeUsers)
    })
})