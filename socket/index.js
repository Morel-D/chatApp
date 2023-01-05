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


    // Send message
    socket.on('send-message', (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((users) => user.userId === receiverId)
        console.log("Sending from socket to :", receiverId)
        console.log("Data", data)
        
        if (user)
        {
            io.to(user.socketId).emit('receive-message', data)
            }
    })

    // Disconnect user
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        io.emit('get-users', activeUsers)
    })
})