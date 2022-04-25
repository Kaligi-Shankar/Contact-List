const mongoose = require('mongoose'); //require the library

mongoose.connect('mongodb://localhost/contact-list_db'); //connect to the database

const db = mongoose.connection; //aquire the connection to check if it is successfull

db.on('error', console.error.bind(console, 'error connecting to db')); //error

// up and running then print the message
db.once('open', function(){
    console.log('successfully connected to the database');
});


