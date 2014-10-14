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

// define interactions with client

io.sockets.on('connection', function(socket){
    
    //recieve 1th step client data
    socket.on('client_data', function(data,res){
        var form = require('./form1');      

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
        { error = error + 'Firtname invalid' };

        if (!va.isAlpha(form.lastName)) 
        { error = error + '- Lastname invalid' };

        if (!va.isAlpha(form.middleName)) 
        { error = error + '- Middle name invalid' };     

        if (!va.isAlpha(form.payFreq)) 
        { error = error + '- Pay frequency invalid' };      

        if (!va.isNumeric(form.ssn) || !va.isLength(form.ssn, 9, 9))
        { error = error + '- SSN invalid'}; 

        if (!va.isLength(form.state, 2, 2) || !va.isAlpha(form.state))
        { error = error + '- State invalid'}; 

        if (!va.isInt(form.monthIncome, 3))
        { error = error + '- Month income invalid'};         

        if (!va.isEmail(form.email))
        { error = error + '- Email invalid '}; 

        if (!va.isNumeric(va.blacklist(form.birth,'/')) || !va.isLength(form.birth, 10))
        { error = error + '- Date invalid '};    

        if (!va.isNumeric(va.blacklist(form.hphone,'-')) || !va.isLength(form.hphone, 12 ))
        { error = error + '- Home phone invalid'};  

        if (!va.isNumeric(va.blacklist(form.cphone,'-')) || !va.isLength(form.cphone, 12))
        { error = error + '- Cell phone invalid '}; 

        if (!va.isNumeric(va.blacklist(form.wphone,'-')) || !va.isLength(form.wphone, 12))
        { error = error + '- Work phone invalid'};  

        //error = error.replace(/input/g, ' - '); 

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
        var form2 = require('./form2');      

        form2.fundType = data.fundType;
        form2.driLicense = data.driLicense; 
        form2.isMilitary = data.isMilitary;
        form2.formatted_address = data.formatted_address; 
        form2.postal_code = data.postal_code;
        form2.locality = data.locality; 
        form2.administrative_area_level_1 = data.administrative_area_level_1;
        form2.mailed_formatted_address = data.mailed_formatted_address;
        form2.mailed_postal_code = data.mailed_postal_code;
        form2.mailed_locality = data.mailed_locality; 
        form2.mailed_administrative_area_level_1 = data.mailed_administrative_area_level_1;
        
        form2.totalIncome = data.totalIncome;    
        form2.incomeType = data.incomeType; 
        form2.payrollType = data.payrollType; 
        form2.holidaySkip = data.holidaySkip; 
        form2.pfren = data.pfren; 
        form2.employerName = data.employerName; 
        form2.workAddress = data.workAddress; 
        form2.workCity = data.workCity; 
        form2.workState = data.workState; 
        form2.workZip = data.workZip; 
        form2.wPhone = data.wPhone; 
        form2.wPhoneext = data.wPhoneext; 
        form2.wPhonec = data.wPhonec; 

        form2.bankName = data.bankName; 
        form2.bankCity = data.bankCity; 
        form2.bankState = data.bankState; 
        form2.abaNumber = data.abaNumber; 
        form2.accountNumber = data.accountNumber;
        form2.accountType = data.accountType;
        form2.monthwithAccount = data.monthwithAccount;        

        // Form items Validation
        // Personal information && Contact information               
        var error = '';
        if (va.isNull(form2.fundType) || !va.isAlpha(form2.fundType))
        { error = error + '- Fund type invalid'};

        if (va.isNull(form2.driLicense) || !va.isLength(form2.driLicense, 5, 15)) 
        { error = error + '- Driver License invalid' };

        if (!va.isAlpha(form2.isMilitary)) 
        { error = error + '- Military invalid' }; 

        if (va.isNull(form2.formatted_address))
        { error = error + '- Address invalid' };

        if (va.isNull(form2.postal_code)) 
        { error = error + '- Post Code invalid' };

        if (!va.isAlpha(form2.locality)) 
        { error = error + '- City invalid' };             

        if (!va.isAlpha(form2.administrative_area_level_1)) 
        { error = error + '- State invalid' }; 

        if (va.isNull(form2.mailed_formatted_address))
        { error = error + '- Address invalid' };

        if (va.isNull(form2.mailed_postal_code)) 
        { error = error + '- Post Code invalid' };

        if (!va.isAlpha(form2.mailed_locality)) 
        { error = error + '- City invalid' };             

        if (!va.isAlpha(form2.mailed_administrative_area_level_1)) 
        { error = error + '- State invalid' }; 


        //Employment Info
        if (!va.isFloat(form2.totalIncome))
        { error = error + '- Total Income invalid'}; 

        if (va.isNull(form2.incomeType) || !va.isAlpha(form2.incomeType))
        { error = error + '- Income Type invalid'}; 

        if (va.isNull(form2.payrollType) || !va.isAlpha(form2.payrollType))
        { error = error + '- Pay Roll Type invalid'};         

        if (va.isNull(form2.holidaySkip) || !va.isAlpha(form2.holidaySkip))
        { error = error + '- Pay Holiday Skip Type invalid'}; 

        if (va.isNull(form2.pfren) || !va.isAlpha(form2.pfren))
        { error = error + '- Pay Frequency invalid'};     

        if (va.isNull(form2.employerName) || !va.isAlpha(form2.employerName) || !va.isLength(form2.employerName, 2, 50))
        { error = error + '- Employer Name invalid '}; 

        if (va.isNull(form2.occupation) || !va.isAlpha(form2.occupation) || !va.isLength(form2.occupation, 1, 30))
        { error = error + '- Occupation invalid '}; 

        if (va.isNull(form2.workAddress))
        { error = error + '- Address invalid' };

        if (va.isNull(form2.workZip)) 
        { error = error + '- Post Code invalid' };

        if (!va.isAlpha(form2.workCity)) 
        { error = error + '- City invalid' };             

        if (!va.isAlpha(form2.workState)) 
        { error = error + '- State invalid' };     

        if (!va.isNumeric(va.blacklist(form2.wPhone,'-')) || !va.isLength(form2.wPhone, 12, 15 ))
        { error = error + '- Work Phone invalid'};  

        if (!va.isLength(form2.wPhoneext, 1 , 8))
        { error = error + '- Work Ext invalid '}; 

        if (!va.isNumeric(va.blacklist(form2.wPhonec,'-')) || !va.isLength(form2.wPhonec, 12, 15))
        { error = error + '- Work Cell Phone invalid'};  

        //Bank Info
        if (va.isNull(form2.bankName) || !va.isLength(form2.bankName, 2, 50))
        { error = error + '- Bank Name invalid '}; 

        if (va.isNull(form2.bankCity) || !va.isAlpha(form2.bankCity) || !va.isLength(form2.bankCity, 2, 50)) 
        { error = error + '- Bank City invalid' };          

        if (va.isNull(form2.bankState) || !va.isAlpha(form2.bankState) || !va.isLength(form2.bankState, 2, 10)) 
        { error = error + '- Bank State invalid' };

        if (va.isNull(form2.monthwithAccount) || !va.isNumeric(form2.monthwithAccount)) 
        { error = error + '- Months With Account invalid' };               

        if (va.isNull(form2.accountNumber) || !va.isNumeric(form2.accountNumber) || !va.isLength(form2.wPhonec, 4, 17)) 
        { error = error + '- Bank Account Number invalid' };

        if (va.isNull(form2.accountType) || !va.isAlpha(form2.accountType)) 
        { error = error + '- Bank Account Type invalid' };

        var validRoutingNumber = require('./validRoutingNumber'); 
        //if (va.isNull(form2.abaNumber) || !validRoutingNumber ) 
        //{ error = error + '- Bank Routing transit number invalid' };
        error = error + '- validRoutingNumber' + validRoutingNumber(form2.abaNumber);

        //send the result back to front
        if (form2.bankName === 'BMO'){          
          socket.emit('va_pass', {'mess': ''});

            //Direct client to different URL
            setInterval(function(){
                socket.emit('url', '/');
                }, 2000);          
            }

        else {
          socket.emit('va_er', {'mess': error}); 

      }

    });

});