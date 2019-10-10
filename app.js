const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');


// Connect To Database
mongoose.connect(config.database, { useNewUrlParser: true});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();


const customerInfos = require('./routes/customerInfo');
const accountInfos = require('./routes/accountInfo');
const contactInfos = require('./routes/contactInfo');
const txnInfos = require('./routes/txnInfo');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/customers', customerInfos);
app.use('/customers', accountInfos);
app.use('/customers', contactInfos);
app.use('/customers', txnInfos);
app.use(passport.session());

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');



// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
                                   

module.exports = app;
