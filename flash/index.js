require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/', require('./services/login.service'));
//app.use('/dbconfig', require('./services/dbconfig.service'));
//app.use('/db', require('./services/dbcontroller.service'));

// global error handler
app.use(errorHandler);

var server = app.listen(8003, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Nuovoo-flash started on ", host, port)
})
