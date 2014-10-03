var socket = io.connect();

socket.on('va', function(data){
    $('#textva').css("display","block");
    $('#textva').text(data.mess);
});

socket.on('url', function (data) {
    window.location.href=data; 
});

$(document).ready(function() {
    $('#registrationForm')
      
      .bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            lamount: {
                message: 'The number is not valid',
                validators: {
                    notEmpty: {
                        message: 'The number is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 10,
                        message: 'The number must be more than 3 and less than 10 characters long'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The number can only consist of number'
                    }
                }
            },
            fusername: {
                message: 'The name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The username can only consist of alphabetical and number'
                    },
                    different: {
                        field: 'lusername',
                        message: 'The first name and last name cannot be the same as each other'
                    }
                }
            },
            lusername: {
                message: 'The name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The username must be more than 2 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The username can only consist of alphabetical and number'
                    },
                    different: {
                        field: 'fusername',
                        message: 'The first name and last name cannot be the same as each other'
                    }
                }
            },
            musername: {
                message: 'The name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message: 'The username must be more than 2 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The username can only consist of alphabetical and number'
                    }
                }
            },            
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    }
                }
            },
            ssn: {
                message: 'The SSN is not valid',
                validators: {
                    notEmpty: {
                        message: 'The SSN is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 10,
                        message: 'The SSN must be 9 digits long'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The number can only consist of number'
                    }
                }
            },
            hphone: {
                message: 'The phone number is not valid',
                validators: {
                    notEmpty: {
                        message: 'The phone number is required and cannot be empty'
                    }                  
                }
            },  
            cphone: {
                message: 'The phone number is not valid',
                validators: {
                    notEmpty: {
                        message: 'The phone number is required and cannot be empty'
                    }
                }
            },  
            wphone: {
                message: 'The phone number is not valid',
                validators: {
                    notEmpty: {
                        message: 'The phone number is required and cannot be empty'
                    }
                }
            },  
            pfren: {
                message: 'The frequency is not valid',
                validators: {
                    notEmpty: {
                        message: 'The frequency is required and cannot be empty'
                    }
                }
            },                
            state: {
                message: 'The state is not valid',
                validators: {
                    notEmpty: {
                        message: 'The state is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 2,
                        message: 'The state must be 2 chars long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The state can only consist of number'
                    }
                }
            },  
            mincome: {
                message: 'The Monthly Income  is not valid',
                validators: {
                    notEmpty: {
                        message: 'The Monthly Income  is required and cannot be empty'
                    },
                    stringLength: {
                        min: 4,
                        max: 10,
                        message: 'The Monthly Income must be more than 4 numbers long'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The number can only consist of number'
                    }
                }
            },                                                                                   
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    }
                }
            },            
            birthday: {
                validators: {
                    notEmpty: {
                        message: 'The date of birth is required'
                    },
                    date: {
                        format: 'MM/DD/YYYY',
                        message: 'The date of birth is not valid'
                    }
                }
            }
        }
    });

    $('#va_btn').click(function(){
      //socket.emit('client_data', {'mess': 'Aprroved?'});  
      socket.emit('client_data', {'mess': $("input[name*='fusername']").val()});          
    });

    // $('#datetimePicker')
    // .on('dp.change dp.show', function(e) {
    //     // Validate the date when user change it
    //     $('#registrationForm').bootstrapValidator('revalidateField', 'meeting');
    // });      
    $('#textva').css("display","none");
    $('#registrationForm').find('[name="cphone"]').mask('000-000-0000');
    $('#registrationForm').find('[name="wphone"]').mask('000-000-0000');
    $('#registrationForm').find('[name="hphone"]').mask('000-000-0000');
});