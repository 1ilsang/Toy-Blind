const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');

const indexRouter = require('./routes/index');
const boardRouter = require('./routes/board');
const commentRouter = require('./routes/comment');

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: 5000000}));
app.use(express.urlencoded({limit:5000000,extended: true}));
// app.use(bodyparser.json({limit: 100 * 1024 * 1024}));
app.use(cookieParser());
app.use(cors({origin: 'http://127.0.0.1:3030'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/board', boardRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;
