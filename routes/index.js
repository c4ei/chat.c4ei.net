var express = require('express');
var router = express.Router();
const path = require('path');
const STATIC_PATH = path.join(__dirname, '../public')
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');
const dbCon = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
dbCon.connect();
const session = require('express-session');
const FileStore = require('session-file-store')(session); // 1
router.use(session({  // 2
  secret: process.env.SESSIONSECRET,  // 암호화
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

// npm i sync-mysql
var db_config = require(__dirname + '/database.js');// 2020-09-13
var sync_mysql = require('sync-mysql'); //2020-01-28
let sync_connection = new sync_mysql(db_config.constr());

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   let sql = "";
//   sql = sql +"SELECT yyyy, wk, sum(klay_sum_chips) klay_sum_chips, sum(c4ei_sum_chips) c4ei_sum_chips, sum(ceik_sum_chips) ceik_sum_chips "; 
//   sql = sql +" , sum(ksp_sum_chips) ksp_sum_chips , sum(bck_sum_chips) bck_sum_chips FROM ( ";
//   sql = sql +"SELECT IFNULL(yyyy,YEAR(NOW())) AS yyyy, IFNULL(wk,WEEK(NOW())) AS wk, ";
//   sql = sql +"CASE WHEN coin_name = 'KLAY' THEN IFNULL(sum(chips),0) ELSE 0 END AS klay_sum_chips,  ";
//   sql = sql +"CASE WHEN coin_name = 'C4EI' THEN IFNULL(sum(chips),0) ELSE 0 END AS c4ei_sum_chips,  ";
//   sql = sql +"CASE WHEN coin_name = 'CEIK' THEN IFNULL(sum(chips),0) ELSE 0 END AS ceik_sum_chips,  ";
//   sql = sql +"CASE WHEN coin_name = 'KSP' THEN IFNULL(sum(chips),0) ELSE 0 END AS ksp_sum_chips,    ";
//   sql = sql +"CASE WHEN coin_name = 'BCK' THEN IFNULL(sum(chips),0) ELSE 0 END AS bck_sum_chips     ";
//   sql = sql +"FROM lotto where yyyy=YEAR(NOW()) and wk=WEEK(NOW()) ";
//   sql = sql +"GROUP BY coin_name ) ds ";
//   sql = sql +"GROUP BY yyyy, wk ";
//   let result = sync_connection.query(sql);
//   //console.log(result.length+":result.length");
//   let _yyyy             = "";
//   let _wk               = "";
//   let _c4ei_sum_chips   = 0;
//   let _klay_sum_chips   = 0;
//   let _ceik_sum_chips   = 0;
//   let _ksp_sum_chips    = 0;
//   let _bck_sum_chips    = 0;
//   if(result.length>0){
//     _yyyy             = result[0].yyyy;
//     _wk               = result[0].wk;
//     _c4ei_sum_chips   = result[0].c4ei_sum_chips;
//     _klay_sum_chips   = result[0].klay_sum_chips;
//     _ceik_sum_chips   = result[0].ceik_sum_chips;
//     _ksp_sum_chips    = result[0].ksp_sum_chips;
//     _bck_sum_chips    = result[0].bck_sum_chips;      
//   }
//   let sql2 = "";
//   sql2 = sql2 +"SELECT yyyy,wk,coin_name,sumchips,sum_sendchips,real_tot,real_half_tot,amt1st,amt2nd,amt3rd,regdate FROM lotto_sum_money WHERE `yyyy`=YEAR(NOW()) AND `wk`=WEEK(NOW())";
//   let result2 = sync_connection.query(sql2);

//   let sql3 = "";
//   sql3 = sql3 +"SELECT yyyy,wk,coin_name,c_rank,rankCnt,chipSum FROM lotto_rank WHERE `yyyy`=YEAR(NOW()) AND `wk`=WEEK(NOW())-1";
//   let result3 = sync_connection.query(sql3);

//   let sql4 = "";
//   sql4 = sql4 +"SELECT yyyy,wk,yyyymmdd,numb_tot,numb1,numb2,numb3,numb4,numb5,numb6,numb7 FROM lotto_num WHERE yyyy=YEAR(NOW()) and wk=WEEK(NOW())-1"; 
//   let result4 = sync_connection.query(sql4);

//   console.log(timestamp()+"######### index.js ######### "+" _yyyy : "+_yyyy+" / _wk : "+_wk+" / c4ei_sum_chips : "+_c4ei_sum_chips+" / klay_sum_chips : "+_klay_sum_chips);
//   res.render('index', { title: 'main', "yyyy":_yyyy, "wk":_wk, "c4ei_sum_chips":_c4ei_sum_chips, "klay_sum_chips":_klay_sum_chips , "ceik_sum_chips":_ceik_sum_chips
//   , "ksp_sum_chips":_ksp_sum_chips, "bck_sum_chips":_bck_sum_chips , "result2":result2, "result3":result3, "result4":result4 });
// });

router.get('/', function(req, res, next) {
  if (req.cookies.user_idx == "" || req.cookies.user_idx === undefined ) {
    res.sendFile(STATIC_PATH + '/ulogin.html');
    return;
  }
  else {
    console.log("//// 61 user_email :"+req.cookies.user_email+"////");
    getUserInfoByEmail(req.cookies.user_email);
    console.log("//// 63 user_email :"+userInfo.user_email +"////");

    res.sendFile(STATIC_PATH + '/chat.html');
    return;
  }
});



router.get('/mysession', function(req, res, next) {
  res.render('myinfo', { email: userInfo.user_email });
});

/////////////////////////
router.get('/session2cookie', function(req, res, next) {
  //# added ggoogle auth
  console.log("### 106 ### session check : "+req.session.user_idx +" / "+req.session.user_email); 
  let tem_user_email = req.session.user_email;
  //case only email exist
  if (tem_user_email == "" || tem_user_email === undefined ) {
    console.log("###111### /session2cookie [tem_user_email : "+tem_user_email+"]"); 
    res.redirect('/');
  } else {
    console.log("###114### /session2cookie [tem_user_email : "+tem_user_email+"]"); 
    res.cookie('user_email', tem_user_email);
    let result = sync_connection.query("SELECT id FROM user a WHERE a.email='" + tem_user_email + "'");
    let user_id = result[0].id;
    res.cookie('user_idx', user_id);
    try{
      let user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
      let result2 = sync_connection.query("update user set loginCnt=loginCnt+1, last_reg=now(),last_ip='"+user_ip+"' where id = '" + user_id + "'");
    }catch(e){

    }
    req.session.user_email = null;
    req.session.user_idx = null;
  }
  
});

router.get('/htmlLogin', function(req, res, next) {
    res.sendFile(STATIC_PATH + '/ulogin.html')
    return;
});

router.post('/login', function(req, res, next) {
  let txt_email     = req.body.email; 
  let txt_password  = req.body.password;
  let user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  let sql ="SELECT id, email, password FROM user WHERE email='"+jsfnRepSQLinj(txt_email)+"' ";
  let result = sync_connection.query(sql);
  console.log("######### index.js 142  ######### "+getCurTimestamp()+" txt_email: "+txt_email +"\n"+sql);
  if(result.length > 0){
    let db_password = result[0].password;
    let db_id = result[0].id;

    let bcrypt = require('bcrypt');
    // user_dbpwd = user_dbpwd.replace(/^\$2y(.+)$/i, '$2a$1');
    // if(bcrypt.compareSync(param_password, user_dbpwd)){
    // const secretKey = process.env.SECRET_JWT || "";
    // const token = jwt.sign({ user_id: user.id.toString() }, secretKey, { expiresIn: '24h' });
    let isMatch = bcrypt.compare(txt_password, db_password);
    if (isMatch) {
      let strsql ="update user set loginCnt=loginCnt+1, last_reg=now(),last_ip='"+user_ip+"' where id = '" + db_id + "'";
      res.cookie('user_idx', db_id);
      res.cookie('user_email', txt_email);
    } else {
      return res.render('error', { 'msg' :'Incorrect password!' });
    }
  }else{
    console.log("######### index.js 160  ######### "+getCurTimestamp()+" no id: "+txt_email);
    return res.render('error', { 'msg' :'id not exist' });
  }
  // console.log("######### index.js 163  ######### "+getCurTimestamp()+" no id: "+txt_email);
  // return res.redirect('/chat');
  // if (req.cookies.user_idx == "" || req.cookies.user_idx === undefined ) {
  //   res.sendFile(STATIC_PATH + '/ulogin.html');
  //   return;
  // }
  // else {
  // }
});


////////////////////////////////////////////////////////////////////////
//https://stackoverflow.com/questions/63458440/save-google-authenticated-user-into-mysql-database-with-node-js-and-passport-js
//npm install passport passport-google-oauth2
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
router.use(passport.initialize());

passport.serializeUser((user, done) => { 
  // console.log("passport.serializeUser"); 
  done(null, user);
  
});

passport.deserializeUser((req, user, done) => {
  // console.log("passport.deserializeUser");
  sync_connection.query("SELECT id, username, email, google_id, google_token FROM user WHERE google_id = ?", [user.google_id], (err, rows) => {
      if (err) {
          console.log(err);
          return done(null, err);
      }
      done(null, user);
  });
});

passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
      passReqToCallback: true,
      // profileFields: configAuth.googleAuth.profileFields
  }, 
  function (req, accessToken, refreshToken, profile, done) {
    let user_ip   = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    process.nextTick(function () {
      try{
        let result1     = sync_connection.query("SELECT id, username, email, google_id, google_token FROM user WHERE google_id ='" + profile.id + "'");
        let user_idx    = result1[0].id;
        let user_email  = result1[0].email;
        let google_id   = result1[0].google_id;
        let google_token = result1[0].google_token;
        let google_name = result1[0].username;

        //####################################
        req.session.user_idx = user_idx;
        req.session.user_email = user_email;
        console.log("#### GoogleStrategy ####"); 
        console.log("####222#### user_idx : "+req.session.user_idx +" / user_email : "+req.session.user_email); 
        //####################################

        let user = { google_id: google_id, google_token: google_token, google_email: user_email, google_name: google_name }
        return done(null, user);
      }catch (err){
        console.log(err + ":err");
        let newUser = {
            google_id: profile.id,
            google_token: accessToken,
            google_email: profile.emails[0].value,
            google_name: profile.name.givenName + ' ' + profile.name.familyName
          }
          // save_db_googleid(newUser.google_name, newUser.google_email, newUser.google_id, newUser.google_token, user_ip);
          let strsql = "INSERT INTO user (username, email, google_id, google_token, password, regip) values ('" + newUser.google_name + "','" + newUser.google_email + "','" + newUser.google_id + "','" + newUser.google_token + "','$2a$08$kCv8ZIWU1pMiTm8BNJl.eeTYr2iopCY5YsuG1KGcB3D2qk6kiUv7a','"+user_ip+"')";
          // console.log(strsql);
          try { 
            let result1 = sync_connection.query(strsql);
            console.log("############# google insert success #############");
            req.session.user_email = newUser.google_email;
            get_gmail_saveCookie(newUser.google_email); // 22-12-16
          } catch (err) { 
            console.log("############# google insert fail #############");
          } 
          
          return done(null, newUser);
        }
      });
    }
));

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    // successRedirect: '/session2cookie',
    successRedirect: '/chat',
    failureRedirect: '/htmlLogin'
}));

function save_db_googleid(username, email, google_id, google_token, user_ip){
  let strsql = "INSERT INTO user (username, email, google_id, google_token, password, regip) values ('" + username + "','" + email + "','" + google_id + "','" + google_token + "','$2a$08$kCv8ZIWU1pMiTm8BNJl.eeTYr2iopCY5YsuG1KGcB3D2qk6kiUv7a','"+user_ip+"')";
  // console.log(strsql);
  try { 
    let result1 = sync_connection.query(strsql);
    console.log("############# google insert success #############");
  } catch (err) { 
    console.log("############# google insert fail #############");
  } 
}

function get_gmail_saveCookie(_email){
  let sql ="SELECT id FROM user WHERE email='"+_email+"' ";
  let result = sync_connection.query(sql);
  if ( result.length > 0 ){ 
    let db_id = result[0].id; 
    res.cookie('user_idx', db_id);
    res.cookie('user_email', _email);
  }
}


function timestamp(){ 
  var today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19); 
}

module.exports = router;
