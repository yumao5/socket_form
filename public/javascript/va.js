var socket = io.connect();

socket.on('va_er', function(data){
    //$('#vaMess').modal('show');
    $('#textva_passed').css("display","none");
    $('#serverva_passed').css("display","none");    
    $('#textva').css("display","block");
    $('#serverva').css("display","block");
    //$('#serverva').text(data.mess);
    $("#serverva").text(data.info).html(function(index, currentHtml) {
        return currentHtml.replace(/-/g, '<br /> ');
    });
    //$('#registrationForm').data('bootstrapValidator').resetForm(); 
    //$( "#serverva" ).fadeOut( 3000 );
});

socket.on('va_pass', function(data){
    //$('#vaMess').modal('show');
    $('#textva').css("display","none");
    $('#serverva').css("display","none");
    $('#textva_passed').css("display","block");
    $('#serverva_passed').css("display","block");
    //$('#serverva').text(data.mess);
    $("#serverva_passed").text(data.info).html(function(index, currentHtml) {
        return currentHtml.replace(/-/g, '<br />  -  ');
    });
    //$('#registrationForm').data('bootstrapValidator').resetForm(); 
    //$( "#serverva_passed" ).fadeOut( 3000 );
});

socket.on('url', function (data) {
    window.location.href=data; 
});

$(document).ready(function(){
  $(".va_error_btn").click(function(){
    $(".serverva").fadeIn();
    $(".serverva_passed").fadeIn();
  });
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
            // musername: {
            //     message: 'The name is not valid',
            //     validators: {
            //         notEmpty: {
            //             message: 'The username is required and cannot be empty'
            //         },
            //         stringLength: {
            //             min: 2,
            //             max: 30,
            //             message: 'The username must be more than 2 and less than 30 characters long'
            //         },
            //         regexp: {
            //             regexp: /^[a-zA-Z]+$/,
            //             message: 'The username can only consist of alphabetical and number'
            //         }
            //     }
            // },            
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

      socket.emit('client_data', {'lonaAmount': $("input[name*='lamount']").val() , 
                                  'firstName': $("input[name*='fusername']").val() , 
                                  'lastName': $("input[name*='lusername']").val() ,
                                  'middleName': $("input[name*='musername']").val() ,
                                  'ssn': $("input[name*='ssn']").val() ,
                                  'homePhone': $("input[name*='hphone']").val() ,
                                  'cellPhone': $("input[name*='cphone']").val() ,
                                  'workPhone': $("input[name*='wphone']").val() ,
                                  'payFreq': $("input[name*='pfren']").val() , 
                                  'state': $("input[name*='state']").val() ,
                                  'monthIncome': $("input[name*='mincome']").val() ,
                                  'birth': $("input[name*='birthday']").val() ,
                                  'email': $("input[name*='email']").val() 
                                });          

    }); 

    $('#serverva').css("display","none");
    $('#textva').css("display","none");
    $('#serverva_passed').css("display","none");
    $('#textva_passed').css("display","none");

    $('#registrationForm').find('[name="cphone"]').mask('000-000-0000');
    $('#registrationForm').find('[name="wphone"]').mask('000-000-0000');
    $('#registrationForm').find('[name="hphone"]').mask('000-000-0000');

    // Reset button to help css style
    $('#rest_btn').click(function(){
        $('#registrationForm').data('bootstrapValidator').resetForm();  
    }) ; 
    
});