var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let errorService = require('./services/errorService')

const expressValidator = require('express-validator')
var bodyParser = require('body-parser')

var logger = require('./utils/logger');

//ROUTES
var authRouter = require('./routes/auth');
var userRouter = require('./routes/users');
var songsRouter = require('./routes/songs');

let basePathApi = "/cancionero"
//ROUTES


var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(cors())
app.use(expressValidator())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get(basePathApi+"/health", (req,res) => res.send("ok"));
app.use(basePathApi,  authRouter);
app.use(basePathApi + "/user", userRouter);
app.use(basePathApi, songsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = errorService.getErrorObject( "path not found",404 )
  logger.error("path not found --> " +`${req.method} ${req.originalUrl}`);
  res.status(404).send(err)
});

// error handler
app.use(function(err, req, res, next) {
  logger.error(JSON.stringify(err));

  res.status(500).send( errorService.checkErrorObject(err) )
});


module.exports = app;
