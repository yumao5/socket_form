var express = require('express.io')
var cookieParser = require('cookie-parser');
var i18n = require('i18n');
var path = require('path');
var va = require('validator');
var http = require('https');
var colors = require('colors');
var geoip = require('geoip-lite');
var MongoStore = require('connect-mongo')(express);

// Express init
var app = express();
app.http().io();

app.use(express.cookieParser());
app.use(express.session({
    secret: 'kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig',              
    key: 'sid',
    store:new MongoStore({
            db: 'test',
            host: '127.0.0.1',
            port: 27017,  
            username: 'root',
            password: '', 
            collection: 'session', 
            auto_reconnect:true,
    }),
    cookie: { path: '/', httpOnly: true, maxAge : 36000000 },      
}));

//i18n init
i18n.configure({
    locales:['en', 'sp'],
    directory:'./locales',    
});

var server = app.listen(3000, function() {
    console.log('Dev App Listening on port %d', server.address().port);
})

app.use(i18n.init); 
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.all('*', ensureSecure); // Show info

app.get('/', function (req, res) {
  res.render('index'); 

  if (req.cookies.rememberme === '1+2+3') {  
    req.session.cookie.maxAge = 36000000; 
    console.log(colors.green("Cookies exits and Sessions ID is"), colors.red.underline(req.session.id));
  }
  else {
    res.cookie('rememberme', '1+2+3', { maxAge: 365 * 24 * 60 * 60 * 1000 * 100, httpOnly: true} );  
    console.log("Sessions ID: ", req.session.id);
  }
  //console.log("Cookies Id: ", req.cookies.sid);

  var ip = "211.147.4.31";
  var geo = geoip.lookup(ip);

  console.log(colors.green("Vistor Geo info is"), colors.red.underline(geo.region ,'/', geo.country ,'/', geo.city ));

});

app.get('/hr', function (req, res) {

  var body = '<?xml version="1.0" encoding="utf-8"?> <REQUEST> <REFERRAL> <STOREKEY>NSTF2</STOREKEY> <REFURL>https://nstf.epicloansystems.com/service/leadinbox.ashx</REFURL> <IPADDRESS>173.209.212.155</IPADDRESS> <TIERKEY>OTTP71CBGAI3TSXRVT66LKRCWDRPRAP1OQV0J2156C2HW4CPOPKQ1G242GRS7LH6</TIERKEY> <AFFID/> <SUBID/> <TEST>true</TEST> </REFERRAL> <CUSTOMER> <PERSONAL> <REQUESTEDAMOUNT>400</REQUESTEDAMOUNT> <SSN>000000000</SSN> <DOB>1965-09-26</DOB> <FIRSTNAME>Lisa</FIRSTNAME> <MIDDLEINITIAL/> <LASTNAME>Brown</LASTNAME> <ADDRESS>359 Farmview rd</ADDRESS> <ADDRESS2/> <CITY>Farmville</CITY> <STATE>VA</STATE> <ZIP>23901</ZIP> <HOMEPHONE>(434)390-8931</HOMEPHONE> <OTHERPHONE>(434)414-5820</OTHERPHONE> <DLSTATE>VA</DLSTATE> <DLNUMBER>T67530000</DLNUMBER> <CONTACTTIME/> <ADDRESSMONTHS>10</ADDRESSMONTHS> <ADDRESSYEARS>3</ADDRESSYEARS> <RENTOROWN>R</RENTOROWN> <ISMILITARY>false</ISMILITARY> <ISCITIZEN>true</ISCITIZEN> <OTHEROFFERS>true</OTHEROFFERS> <EMAIL>Shaq.xxxxxxx@gmail.com</EMAIL> </PERSONAL> <EMPLOYMENT> <INCOMETYPE>E</INCOMETYPE> <PAYTYPE>D</PAYTYPE> <EMPMONTHS>4</EMPMONTHS> <EMPYEARS>18</EMPYEARS> <EMPNAME>Piedmont Geriatric Hospital</EMPNAME> <EMPADDRESS>5001 E. Patrick Henry Highway.</EMPADDRESS> <EMPADDRESS2>P.O. Box 427</EMPADDRESS2> <EMPCITY>Burkeville</EMPCITY> <EMPSTATE>VA</EMPSTATE> <EMPZIP>23922</EMPZIP> <EMPPHONE>(434)767-4492</EMPPHONE> <EMPPHONEEXT/> <SUPERVISORNAME>Mitzi Thackston</SUPERVISORNAME> <HIREDATE>1995-11-16</HIREDATE> <EMPTYPE>F</EMPTYPE> <JOBTITLE>Nursing aid</JOBTITLE> <PAYFREQUENCY>B</PAYFREQUENCY> <NETMONTHLY>1800</NETMONTHLY> <LASTPAYDATE>2014-09-16</LASTPAYDATE> <NEXTPAYDATE>2014-10-01</NEXTPAYDATE> <SECONDPAYDATE>2014-10-16</SECONDPAYDATE> </EMPLOYMENT> <BANK> <BANKNAME>Wells Fargo</BANKNAME> <ACCOUNTTYPE>C</ACCOUNTTYPE> <ROUTINGNUMBER>051400549</ROUTINGNUMBER> <ACCOUNTNUMBER>1984424992</ACCOUNTNUMBER> <BANKMONTHS>3</BANKMONTHS> <BANKYEARS>4</BANKYEARS> </BANK> <REFERENCES> <REFERENCE> <FIRSTNAME>John</FIRSTNAME> <LASTNAME>Smith</LASTNAME> <PHONE>(111)222-3333</PHONE> <RELATIONSHIP>F</RELATIONSHIP> </REFERENCE> <REFERENCE> <FIRSTNAME>Jim</FIRSTNAME> <LASTNAME>Jones</LASTNAME> <PHONE>(333)222-1111</PHONE> <RELATIONSHIP>F</RELATIONSHIP> </REFERENCE> </REFERENCES> </CUSTOMER> </REQUEST>';

  var postRequest = {
      host: "nstf.epicloansystems.com",
      path: "/service/leadinbox.ashx",      
      port: '443',
      method: "POST",
      headers: {          
          'Content-Type': 'text',
          'Content-Length': Buffer.byteLength(body)
      }
  };

  var buffer = "";

  var req = http.request( postRequest, function( res )    {

     console.log( res.statusCode );
     var buffer = "";
     res.setEncoding('utf8');
     res.on( "data", function( data ) { buffer = buffer + data; } );
     res.on( "end", function( data ) { console.log( buffer ); } );     

  });

  req.write( body );
  req.end();

});


// var get_ip = require('ipware')().get_ip;
// var UAParser = require('ua-parser-js');


// var io = require('socket.io').listen(3000);
// io.sockets.on('connection', function (socket) {
//   var endpoint = socket.manager.handshaken[socket.id].address;
//   console.log('Client connected from: ' + endpoint.address + ":" + endpoint.port);
// });


function ensureSecure(req, res, next){
  console.log(req.headers);
  console.log('req.ip :');
  console.log(req.ip);
  console.log("req.ips");
  console.log(req.ips);
  console.log("req.path");
  console.log(req.path);
  console.log("req.query");
  console.log(req.query);
  console.log("req.cookies");
  console.log(req.cookies);
  console.log("req.signedCookies");
  console.log(req.signedCookies);
  console.log("req.fresh");
  console.log(req.fresh);
  console.log("req.xhr");
  console.log(req.xhr);
  console.log("req.protocol");
  console.log(req.protocol);
  console.log("req.secure");
  console.log(req.secure);
  console.log("req.originalUrl");
  console.log(req.originalUrl);
  next();
}

app.get('/sws', function(req, res){

    //res.render('index'); 

    var soap = require('soap');    
    var soapWSDL = "http://www.webservicex.net/stockquote.asmx?WSDL";
    var args = {symbol: 'JAKK'};
    var quote ='';

    soap.createClient(soapWSDL, function (err, client) {
      
      if (err) throw err;
      console.log(client.describe());
      
      client.GetQuote(args, function(err, result) {
        console.log(result);
        quote = result;
      })  
     });

    res.write(quote);
  
});


app.get('/apply', function (req, res) {
   
   res.render('apply') ;

});

app.use('/form', require('./routes/en')); 

//app.use('/sp/forum/', require('./routes/sp')); 

// i18n modules test block
// app.use('/sp/forum/', function (req, res) {
//   //res.render('forum', {
//   //  setLocale('sp'),
//   //});    
//   req.setLocale('sp');   
//   res.render('forum') 
// });
// app.get('/ch/forum/', function (req, res) {
//   //res.render('forum', {
//   //  'error': i18n.__('E1')
//   //});
//   req.setLocale('ch');   
//   res.render('forum') 
// });

// app.get('*', function(req, res, next) {

// Https modules test block
//     if (req.get('x-forwarded-proto') != "https") {
//         res.set('x-forwarded-proto', 'https');
//         res.redirect('https://' + req.get('host') + req.url);
//     } else {
//         next();
//     }
// });


// Define socket interactions with client
// recieve 1th step client data
app.io.route('client_data', function(req) {

    var form = require('./form/form1')(req.data);         
    var formVa = require('./form/form1_va');
    error = formVa.formValidate(form);        

    //Send the result back to front
    if (form.firstName === 'test'){          
      req.io.emit('va_pass', {'info': ''});

        //Direct different URL
        setInterval(function(){
            req.io.emit('url', '/form');
        }, 2000);          
    }
    else {
      req.io.emit('va_er', {'info': error}); 
    }

});

app.io.route('client_data2', function(req) {

    var form2 = require('./form/form2')(req.data);         
    var formVa = require('./form/form2_va');
    error = formVa.formValidate(form2);        

    //Send the result back to front
    if (form2.bankName === 'BMO'){          
      req.io.emit('va_pass', {'info': ''});

        //Direct different URL
        setInterval(function(){
            req.io.emit('url', '/');
        }, 2000);          
    }
    else {
      req.io.emit('va_er', {'info': error}); 
    }

});