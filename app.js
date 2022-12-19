const  createError = require('http-errors');
const  express = require('express');
const  path = require('path');
const  cookieParser = require('cookie-parser');
const  logger = require('morgan');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3001;

const  indexRouter = require('./routes/index');
const  usersRouter = require('./routes/users');
const  apiRouter = require('./routes/api');
const  chatRouter = require('./routes/chat');

// const PORT = process.env.PORT || 3007;
// const db = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
// const { wrap } = require('module');
const mysql = require('mysql2');
const dbCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
dbCon.connect();
const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:3001" //클라이언트(react) 쪽의 콜스 허용
};
app.use(cors(corsOptions));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

var db_config = require(__dirname + '/routes/database.js');// 2020-09-13
var sync_mysql = require('sync-mysql'); //2020-01-28
let sync_connection = new sync_mysql(db_config.constr());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
//###############################################################
// app.use('/lotto2', express.static( path.join(__dirname, 'lotto2/build') ))
// app.get('/lotto2', function(req, res){
//   let result = sync_connection.query("SELECT case when DAYOFWEEK(NOW()) =7 then 'Y' ELSE 'N' end satYN, hour(NOW()) hh, MINUTE(NOW()) mm from dual");
//   let _satYN = result[0].satYN; 
//   let _mm = result[0].mm; 
//   let _hh = result[0].hh; 
//   console.log("#### app 144 #### _satYN :" +_satYN +"/ _mm :"+_mm+"/ _hh :"+_hh);
//   if(_satYN =='Y' && _mm >='20' && _hh >='30'){ //토요일 20시 30분 부터 토요일 자정까지는 게임을 할 수 없습니다
//     res.sendFile( path.join(__dirname, '/sat22block.html') )
//   } else {
//     res.sendFile( path.join(__dirname, 'lotto2/build/index.html') )
//   }
// })
//###############################################################
// function timestamp(){ 
//   var today = new Date(); 
//   today.setHours(today.getHours() + 9); 
//   return today.toISOString().replace('T', ' ').substring(0, 19); 
// }

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

function jsfnRepSQLinj(str){
  str = str.replace('\'','`');
  str = str.replace('--','');
  return str;
}

function getCurTimestamp() {
  const d = new Date();

  return new Date(
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    )
  // `toIsoString` returns something like "2017-08-22T08:32:32.847Z"
  // and we want the first part ("2017-08-22")
  ).toISOString().replace('T','_').replace('Z','');
}

// module.exports = app;
http.listen(PORT, () => {
  console.log('Server Start port : ['+PORT +'] '+getCurTimestamp());
});
