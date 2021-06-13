var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(session({
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: 'todo123',
   cookie: {
      // maxAge: 1000*60*60,
       sameSite: true,
       secure: false
   },
  // store: sessionStore
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get("/", (req, res) => {
  res.redirect('/todo');
})

app.get("/todo", (req, res) => {
  if(!req.session.list){
    req.session.list =[]
  }
  var a = req.session.list
  console.log(a)
  res.render('todo',{a});
})

app.post("/todo", (req, res) => {
  var body= req.body
  req.session.list.push(`${body.task}`)

  res.redirect('/todo');
// res.json(req.session)
})

app.post("/delete/:id", (req, res) => {
  var id= req.params.id
  req.session.list.splice(id, 1)
  res.redirect('/todo')
})

app.get('/logout', function(req, res){
  req.session.destroy((err)=>{
      if(err) throw err;
      res.redirect('/todo')
  
  })
})  

module.exports = app;
