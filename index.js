const express = require('express'); //require express -npm install express-
const path = require('path'); //path for views folder
const port = 8000; //creating port number


const db = require('./config/mongoose'); // require mongoose file
const Contact = require('./models/contact');
const contact = require('./models/contact');




const app = express();

app.set('view engine', 'ejs'); //setting up of ejs
app.set('views', path.join(__dirname, 'views')); // joining the path for views
app.use(express.urlencoded());  //to take data from the form
app.use(express.static('assets')); // for css js images fontawesome etc.

// creating empty contact list
var contactList = []; 

// creating home page- to display on home page
app.get('/', function(req, res){

        Contact.find({}, function(err, contacts){
            if(err){
                console.log ('Error in fetching contacts form db');
                return;
                    }
            return res.render('home', {
                title: "My Contact List",
                contact_list: contacts
                });    
    // console.log(__dirname);
    // res.send('cool, it is running! or is it?');
        });
    });
//creating another page
app.get('/practice', function(req, res){
    return res.render('Practice', {
        title: "let us play with ejs"
    })
});

//pushing the data form form to array
app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){ console.log('error in creating a contact');
    return; }

    console.log('******', newContact);
    return res. redirect('back');
    });

    // return res.redirect('back');
    // return res.redirect('/');
});

//for deleting a contact
app.get('/delete-contact', function(req,res){
    //get the param from the url
    //get the id from param in the ul

let id = req.query.id;
    // console.log(req.params);
    // let phone = req.params.phone;

    //find the contact in the database using id and delete
    contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
        return;
        }
        return res.redirect('back');
    });
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
    
});

// app.get('/Profile', function(req, res){
//     res.send('<h1>still not created profile!</h1>');
// });

// for  creating and running the server using ejs
app.listen(port, function(err){
    if(err){
        console.log("Error in running the server", err);
    }
    console.log('Yup! My express server is running on port:', port);
});