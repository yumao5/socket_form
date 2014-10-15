var express = require('express');
var cookieParser = require('cookie-parser');
var i18n = require('i18n');
var path = require('path');
var va = require('validator');

var app = express();

// Cookie and Session setup
app.use(cookieParser('S3CRE7'));
//app.use(express.session());
//app.use(app.router);
////app.use(session({secret:'1234567YIUEdkd',saveUninitialized: ture, resave: save}));

var sess;

//i18n config
i18n.configure({
    locales:['en', 'sp', 'ch'],
    directory:'./locales',    
});

var server = app.listen(3000, function() {
    console.log('Dev App Listening on port %d', server.address().port);
})


//app.use(i18n.init); // Should always before app.route
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
//console.log("Cookies: ", req.cookies);
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


// Page session check funcation test block
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

// define socket interactions with client
io.sockets.on('connection', function(socket){
    
    //recieve 1th step client data
    socket.on('client_data', function(data,res){
        var form = require('./form/form1')(data);         

        var formVa = require('./form/form1_va');
        error = formVa.formValidate(form);
        delete form;        

        //send the result back to front
        if (form.firstName === 'mao'){          
          socket.emit('va_pass', {'info': ''});

            //Direct different URL
            setInterval(function(){
                socket.emit('url', '/form');
            }, 2000);          
        }
        else {
          socket.emit('va_er', {'info': error}); 
        }

    });

    //recieve 2th step client data
    socket.on('client_data_2', function(data,res){
        var form2 = require('./form/form2')(data);            

        // Form items Validation           
        var error = '';
        var formVa = require('./form/form2_va');
        error = formVa.formValidate(form2);

        //send the result back to front
        if (form2.bankName === 'BMO'){          
          socket.emit('va_pass', {'info': ''});

            //Direct client to different URL
            setInterval(function(){
                socket.emit('url', '/');
                }, 2000);          
            }

        else {
          socket.emit('va_er', {'info': error}); 

      }

    });

});