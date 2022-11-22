const express = require('express');
const app = express();

const room = ['General', 'Private'];
const cors = require('cors');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const server = require('http').createServer(app);
const PORT = 5000;

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

app.listen(PORT, () => {
    console.log('The app is listening on port ', PORT)
})
