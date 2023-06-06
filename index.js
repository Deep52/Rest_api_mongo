require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const ejs = require("ejs");
const bodyParser = require('body-parser');
const app = express();
const database = mongoose.connection;
const mongoString = process.env.DATABASE_URL
    //console.log(mongoString);
    //const monmodel = mongoose.model("data");
    //app.engine('html', require('ejs').renderFile);
    //app.set('view engine', 'html');



//const mongoString = process.env.NODE_ENV.toString() || 'development';
app.use('/api', routes);
//app.use('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
        res.send('i am good');

    })
    //app.use('/post', (req, res) => {
    //      res.send('Post API')
    //})
    // connect with mongo database
mongoose.connect(mongoString);
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');

})



app.listen(3000, () => {
        console.log(`Server Started at ${3000}`)
    })
    /*app.get('', function(req, res) {
        // res.render("index");

    });*/