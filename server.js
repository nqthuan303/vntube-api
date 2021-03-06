var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  env = process.env.NODE_ENV || 'dev',
  conn = 'mongodb://localhost:27017/vntube',
  port = 3000,
  API = require('./APILib'),
  model = require('./models'),
  routes = require('./routes');

mongoose.Promise = require('bluebird');

if(env !== 'dev'){
  conn = 'mongodb://nqthuan303:thuan1602@ds135252.mlab.com:35252/vntube';
  port = process.env.PORT;
}

mongoose.connect(conn);

var app = express();

app.use(express.static('uploads'));
app.use(passport.initialize());

app.use(bodyParser.json( { limit: '50mb' } ));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));


app.all('*', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);

  API.res = res;
  res.API = API;

  next();
});

routes(app, express);

app.listen(port, function () {
  console.log('server started on port ' + port);
});
