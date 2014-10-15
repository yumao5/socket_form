var va = require('validator');

function formValidate (form1) {     

        var error = '';

        if (!va.isAlpha(form1.firstName))
        { error = error + '- Firstname invalid' };

        if (!va.isAlpha(form1.lastName)) 
        { error = error + '- Lastname invalid' };

        // if (!va.isAlpha(form1.middleName)) 
        // { error = error + '- Middle name invalid' };     

        if (!va.isAlpha(form1.payFreq)) 
        { error = error + '- Pay Frequency invalid' };      

        if (!va.isNumeric(form1.ssn) || !va.isLength(form1.ssn, 9, 9))
        { error = error + '- SSN invalid'}; 

        if (!va.isLength(form1.state, 2, 2) || !va.isAlpha(form1.state))
        { error = error + '- State invalid'}; 

        if (!va.isInt(form1.monthIncome, 3))
        { error = error + '- Month Income invalid'};         

        if (!va.isEmail(form1.email))
        { error = error + '- Email invalid '}; 

        if (!va.isNumeric(va.blacklist(form1.birth,'/')) || !va.isLength(form1.birth, 10))
        { error = error + '- Date invalid '};    

        if (!va.isNumeric(va.blacklist(form1.hphone,'-')) || !va.isLength(form1.hphone, 12 ))
        { error = error + '- Home Phone invalid'};  

        if (!va.isNumeric(va.blacklist(form1.cphone,'-')) || !va.isLength(form1.cphone, 12))
        { error = error + '- Cell Phone invalid '}; 

        if (!va.isNumeric(va.blacklist(form1.wphone,'-')) || !va.isLength(form1.wphone, 12))
        { error = error + '- Work Phone invalid'};  

        return error;
};

module.exports.formValidate = formValidate;