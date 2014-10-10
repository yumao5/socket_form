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

    
    //recieve 1th step client data
    socket.on('client_data', function(data,res){
        var form = require('./form');      

        form.firstName = data.firstName;
        form.lastName = data.lastName; 
        form.lonaAmount = data.lamount;
        form.middleName = data.middleName; 
        form.ssn = data.ssn;
        form.hphone = data.homePhone; 
        form.cphone = data.cellPhone;
        form.wphone = data.workPhone;
        form.payFreq = data.payFreq;
        form.state = data.state; 
        form.monthIncome = data.monthIncome;
        form.birth = data.birth;    
        form.email = data.email; 

        //validation                
        var error = '';
        if (!va.isAlpha(form.firstName))
        { error = error + 'input Firtname invalid' };

        if (!va.isAlpha(form.lastName)) 
        { error = error + 'input Lastname invalid' };

        if (!va.isAlpha(form.middleName)) 
        { error = error + 'input Middle name invalid' };     

        if (!va.isAlpha(form.payFreq)) 
        { error = error + 'input Pay frequency invalid' };      

        if (!va.isNumeric(form.ssn) || !va.isLength(form.ssn, 9, 9))
        { error = error + 'input SSN invalid'}; 

        if (!va.isLength(form.state, 2, 2) || !va.isAlpha(form.state))
        { error = error + 'input State invalid'}; 

        if (!va.isInt(form.monthIncome, 3))
        { error = error + 'input Month income invalid'};         

        if (!va.isEmail(form.email))
        { error = error + 'input Email invalid '}; 

        if (!va.isNumeric(va.blacklist(form.birth,'/')) || !va.isLength(form.birth, 10))
        { error = error + 'input Date invalid '};    

        if (!va.isNumeric(va.blacklist(form.hphone,'-')) || !va.isLength(form.hphone, 12 ))
        { error = error + 'input Home phone invalid'};  

        if (!va.isNumeric(va.blacklist(form.cphone,'-')) || !va.isLength(form.cphone, 12))
        { error = error + 'input Cell phone invalid '}; 

        if (!va.isNumeric(va.blacklist(form.wphone,'-')) || !va.isLength(form.wphone, 12))
        { error = error + 'input Work phone invalid'};  

        // if (!va.isLength(form.birthday, 10)) 
        // { error = error + 'input invalid Date'};           

        error = error.replace(/input/g, ' - '); 

        //send the result back to front

        if (form.firstName === 'mao'){          
          socket.emit('va_pass', {'mess': ''});

            //Direct different URL
            setInterval(function(){
                socket.emit('url', '/form');
                }, 2000);          
            }

        else {
          socket.emit('va_er', {'mess': error}); 

      }

    });

    //recieve 2th step client data
    socket.on('client_data_2', function(data,res){
        var form = require('./form');      

        form.fundType = data.fundType;
        form.driLicense = data.driLicense; 
        form.isMilitary = data.isMilitary;
        form.formatted_address = data.formatted_address; 
        form.postal_code = data.postal_code;
        form.locality = data.locality; 
        form.administrative_area_level_1 = data.administrative_area_level_1;
        form.mailed_formatted_address = data.mailed_formatted_address;
        form.mailed_postal_code = data.mailed_postal_code;
        form.mailed_locality = data.mailed_locality; 
        form.mailed_administrative_area_level_1 = data.mailed_administrative_area_level_1;
        
        form.totalIncome = data.totalIncome;    
        form.incomeType = data.incomeType; 
        form.payrollType = data.payrollType; 
        form.holidaySkip = data.holidaySkip; 
        form.pfren = data.pfren; 
        form.employerName = data.employerName; 
        form.workAddress = data.workAddress; 
        form.workCity = data.workCity; 
        form.workState = data.workState; 
        form.workZip = data.workZip; 
        form.wPhone = data.wPhone; 
        form.wPhoneext = data.wPhoneext; 
        form.wPhonec = data.wPhonec; 

        form.bankName = data.bankName; 
        form.bankCity = data.bankCity; 
        form.bankState = data.bankState; 
        form.abaNumber = data.abaNumber; 
        form.accountNumber = data.accountNumber;
        form.accountType = data.accountType;
        form.monthwithAccount = data.monthwithAccount;        

        //validation                
        var error = '';
        if (!va.isAlpha(form.formatted_address))
        { error = error + 'input Address invalid' };

        if (!va.isAlpha(form.locality)) 
        { error = error + 'input city invalid' };

        if (!va.isAlpha(form.administrative_area_level_1)) 
        { error = error + 'input state invalid' }; 

        if (!va.isAlpha(form.mailed_formatted_address))
        { error = error + 'input Address invalid' };

        if (!va.isAlpha(form.mailed_locality)) 
        { error = error + 'input city invalid' };

        if (!va.isAlpha(form.mailed_administrative_area_level_1)) 
        { error = error + 'input state invalid' };             

        if (!va.isAlpha(form.payFreq)) 
        { error = error + 'input Pay frequency invalid' };      

        if (!va.isNumeric(form.ssn) || !va.isLength(form.ssn, 9, 9))
        { error = error + 'input SSN invalid'}; 

        if (!va.isLength(form.state, 2, 2) || !va.isAlpha(form.state))
        { error = error + 'input State invalid'}; 

        if (!va.isInt(form.monthIncome, 3))
        { error = error + 'input Month income invalid'};         

        if (!va.isEmail(form.email))
        { error = error + 'input Email invalid '}; 

        if (!va.isNumeric(va.blacklist(form.birth,'/')) || !va.isLength(form.birth, 10))
        { error = error + 'input Date invalid '};    

        if (!va.isNumeric(va.blacklist(form.hphone,'-')) || !va.isLength(form.hphone, 12 ))
        { error = error + 'input Home phone invalid'};  

        if (!va.isNumeric(va.blacklist(form.cphone,'-')) || !va.isLength(form.cphone, 12))
        { error = error + 'input Cell phone invalid '}; 

        if (!va.isNumeric(va.blacklist(form.wphone,'-')) || !va.isLength(form.wphone, 12))
        { error = error + 'input Work phone invalid'};  

        // if (!va.isLength(form.birthday, 10)) 
        // { error = error + 'input invalid Date'};           

        error = error.replace(/input/g, ' - '); 

        //send the result back to front

        if (form.firstName === 'mao'){          
          socket.emit('va_pass', {'mess': ''});

            //Direct different URL
            setInterval(function(){
                socket.emit('url', '/');
                }, 2000);          
            }

        else {
          socket.emit('va_er', {'mess': error}); 

      }

    });

});