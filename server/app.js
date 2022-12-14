// Express setup
require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./Routers/userRouter');
const chatRoutes = require('./Routers/chatRouter');
const messageRoutes = require('./Routers/messageRouter');


const room = ['General', 'Private'];
const cors = require('cors');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// create app
const server = require('http').createServer(app);
const PORT = process.env.PORT;

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:4000',
        methods: ['GET', 'POST']
    }
})

app.listen(PORT, () => {
    console.log('The app is listening on port ', PORT)
})

// Database connection
require('./Connection/Connection')


// Routers Path

// Authentication
app.use('/', userRoutes);

//Chat 
app.use('/chat', chatRoutes);

// messsage
app.use('/message', messageRoutes);