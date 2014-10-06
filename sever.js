var express = require('express');
var i18n = require('i18n');
var app = express();
var path = require('path');
var va = require('validator');

//i18n config
i18n.configure({
    locales:['en', 'sp', 'ch'],
    directory:'./locales',    
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
})

app.use(i18n.init); // Should always before app.route
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/apply', function (req, res) {
//   //res.render('forum', {
//   //  'error': i18n.__('E1')
//   //});  
//   //req.setLocale('sp');
   res.render('apply') 
});

function ensureSecure(req, res, next){
  if(req.secure){  
    return next();
  };
  // handle port numbers if you need non defaults
  res.redirect('https://'+req.host+req.url); 
};

app.use('/form', require('./routes/en')); 
app.use('/sp/forum/', require('./routes/sp')); 

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

//     if (req.get('x-forwarded-proto') != "https") {
//         res.set('x-forwarded-proto', 'https');
//         res.redirect('https://' + req.get('host') + req.url);
//     } else {
//         next();     
//     }
// });

// function ensureSecure(req, res, next){
//   if(req.secure){
//     // OK, continue
//     return next();
//   };
//   res.redirect('https://'+req.host+req.url); // handle port numbers if non 443
// };

// app.all('*', ensureSecure);

// use socket.io
var io = require('socket.io').listen(server);

//turn off debug
//io.set('log level', 0);

// define interactions with client
io.sockets.on('connection', function(socket){
    //var form = require('./form');
    
    //recieve client data
    socket.on('client_data', function(data,res){
        var form = require('./form');
      
        form.firstName = data.firstName;
        form.lastName = data.lastName; 
        form.lonaAmount = data.lamount;
        form.middleName = data.musername; 
        form.ssn = data.ssn;
        form.homePhone = data.hphone; 
        form.cellPhone = data.cphone;
        form.workPhone = data.wphone; 
        form.payFreq = data.pfren;
        form.state = data.state; 
        form.monthIncome = data.mincome;
        form.birth = data.birthday;    
        form.email = data.email; 

        //validation                        
        var error = 'Invalid message';

        if (!va.isAlpha(form.firstName) || !va.isAlpha(form.lastName) || 
            !va.isAlpha(form.musername) || !va.isAlpha(form.pfren)    || 
            !va.isAlpha(form.state)) 
        { error = error + 'input invalid Letters' };

        if (!va.isNumeric(form.ssn) || !va.isLength(form.ssn, 9, 9))
        { error = error + 'input SSN invalid'}; 

        if (!va.isLength(form.state, 2, 2))
        { error = error + 'input State invalid'};  

        if (!va.isEmail(form.email))             
        { error = error + 'input invalid Email'}; 

        if (!va.isNumeric(va.blacklist(form.birthday,'/')))
        { error = error + 'input invalid Date'};                  

        if (!va.isLength(form.birthday, 10)) 
        { error = error + 'input invalid Date'};           

        error = error.replace(/input/g, ', input'); 

        //send the result back to front
        if (form.firstName === 'mao'){          
          socket.emit('va', {'mess': 'Approved! ' + error});
        }
        else {
          socket.emit('va', {'mess': 'Denied! ' + error}); 
        
        //Direct different URL
        //setInterval(function(){
        //  socket.emit('url', '/form');
        //}, 5000);
      }
    });
});