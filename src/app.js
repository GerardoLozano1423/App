const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection'),
      session = require('express-session'),
      flash = require('connect-flash'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      cookieParser = require('cookie-parser');
const app = express();

app.use(flash());

app.use(session({
  secret: 'NDmU9JdhDzYiW0%%k*mg50Ugoy',
  resave: false,
  saveUninitialized: true,
  cookie  : { maxAge  : new Date(Date.now() + (60 * 1000 * 30)) }
}));
app.use(passport.initialize());
// persistent login sessions 
app.use(passport.session());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());


// importing routes
const authRoutes = require('./routes/auth');



// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.set('view engine', 'pug');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '12345',
  port: 3306,
  database: 'APP',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', authRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Passport Config
require('../config/passport')(app);

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
