const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL).
    then(() => {
    console.log('Connnection established')
    }).catch(error => {
    console.log('Connecion failed', error.message)
}) 