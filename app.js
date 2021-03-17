var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 加上去的
var session = require('express-session'); //session
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var shoppingRouter = require('./routes/shopping');
var shoppingcarRouter = require('./routes/shoppingcar');
var discountRouter = require('./routes/discount');
var memberRouter = require('./routes/member');
var pdMsgRouter = require('./routes/pdMsg');
// 加上去的
var contactRouter = require('./routes/contact');

// 加上去的

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// 加上去的
app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 加上去的

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.use('/shopping', shoppingRouter);
app.use('/shoppingcar', shoppingcarRouter);
app.use('/discount', discountRouter);
app.use('/member', memberRouter);
app.use('/pdMsg', pdMsgRouter);



app.use('/contact', contactRouter);
//加上去的

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
var contactRouter = require('./routes/contact');

// 寄信需要
var bodyParser = require('body-parser');
var session = require('express-session'); //session

// 寄信需要
// npm install nodemailer --save
// npm install dotenv --save

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 寄信需要
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/shopping', shoppingRouter);
app.use('/shoppingcar', shoppingcarRouter);
app.use('/discount', discountRouter);
app.use('/member', memberRouter);
app.use('/pdMsg', pdMsgRouter);
app.use('/contact', contactRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;