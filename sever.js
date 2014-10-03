var express = require('express');
var i18n = require('i18n');
var app = express();
var path = require('path');

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
    
    //send data to client
    setInterval(function(){
        socket.emit('date', {'date': ' + ' + new Date()});
        //socket.emit('url', '/form');
    }, 1000);

    //recieve client data
    socket.on('client_data', function(data,res){
        //process.stdout.write(data.letter);
        //socket.emit('va', {'name': });
        if (data.mess === 'mao'){
          socket.emit('va', {'mess': 'Approved ! '+ data.mess});
          //socket.emit('url', '/form');
        setInterval(function(){
          //socket.emit('date', {'date': ' + ' + new Date()});
          socket.emit('url', '/form');
        }, 5000);
      }
    });
});