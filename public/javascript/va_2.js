var socket = io.connect();

// socket.on('va_er', function(data){
//     //$('#vaMess').modal('show');
//     $('#textva').css("display","block");
//     $('#serverva').css("display","block");
//     //$('#serverva').text(data.mess);
//     $("#serverva").text(data.mess).html(function(index, currentHtml) {
//         return currentHtml.replace(/-/g, '<br />  -  ');
//     });
//     //$('#registrationForm').data('bootstrapValidator').resetForm(); 
//     $( "#serverva" ).fadeOut( 3000 );
// });

// socket.on('va_pass', function(data){
//     //$('#vaMess').modal('show');
//     $('#textva').css("display","block");
//     $('#serverva').css("display","block");
//     //$('#serverva').text(data.mess);
//     $("#serverva").text(data.mess).html(function(index, currentHtml) {
//         return currentHtml.replace(/-/g, '<br />  -  ');
//     });
//     //$('#registrationForm').data('bootstrapValidator').resetForm(); 
//     $( "#serverva" ).fadeOut( 3000 );
// });

socket.on('url', function (data) {
    window.location.href=data; 
});

// $(document).ready(function(){
//   $(".va_error_btn").click(function(){
//     $(".serverva").fadeIn();
//   });
// });

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
            driLicense: {
                message: 'The driver license is not valid',
                validators: {
                    notEmpty: {
                        message: 'The license is required and cannot be empty'
                    },
                    stringLength: {
                        min: 15,
                        max: 15,
                        message: 'The license must be 15 characters long'
                    },
                    regexp: {
                        regexp: /^[0-9a-zA-Z]+$/,
                        message: 'The license can only consist of alphabetical and number'
                    },
                }
            },
            licenState: {
                message: 'The state is not valid',
                validators: {
                    notEmpty: {
                        message: 'The state is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 2,
                        message: 'The state must be 2 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The state can only consist of alphabetical'
                    },
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
            months: {
                message: 'The months is not valid',
                validators: {
                    notEmpty: {
                        message: 'The months is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 10,
                        message: 'The months must be less than 10 digits long'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The months can only consist of number'
                    }
                }
            },
            totalIncome: {
                message: 'The income is not valid',
                validators: {
                    notEmpty: {
                        message: 'The income is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 10,
                        message: 'The income must not be less than 2 digits long'
                    },
                    regexp: {
                        regexp: /^[0-9]*[.][0-9]+$/,
                        message: 'The income can only consist of float number'
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
            fundType: {
                message: 'The type is not valid',
                validators: {
                    notEmpty: {
                        message: 'The type is required and cannot be empty'
                    }
                }
            }, 
            isMilitary: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The type is required and cannot be empty'
                    }
                }
            },   
            addSame: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The type is required and cannot be empty'
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

    $('#registrationForm').find('[name="totalIncome"]').mask('99999999.00');
    
    // Reset button to help css style
    $('#rest_btn').click(function(){
        $('#registrationForm').data('bootstrapValidator').resetForm();  
    }) ; 

    // Copy address data to maill address input
    $("input:radio[name=addSame]").click(function(){
          var value = $(this).val();          
          if (value === "Yes") {     
            //alert(value);        
            $("input[name*='mailed_formatted_address']").val($("input[name*='formatted_address']").val());            
            $("input[name*='mailed_postal_code']").val($("input[name*='postal_code']").val());            
            $("input[name*='mailed_locality']").val($("input[name*='locality']").val());            
            $("input[name*='mailed_administrative_area_level_1']").val($("input[name*='administrative_area_level_1']").val());            
          };
          var empty ="";
          if (value === "No") {         
            //alert(value);   
            $("input[name*='mailed_formatted_address']").val(empty);            
            $("input[name*='mailed_postal_code']").val(empty);            
            $("input[name*='mailed_locality']").val(empty);            
            $("input[name*='mailed_administrative_area_level_1']").val(empty);            
          };
    })


    // if ($("input:checked", "#sameAdd").val()){
    //      $('#mailed_formatted_address').val($("input[name*='formatted_address']").val());
    // }
        // $("input[name*='mailed_formatted_address']").val() == $("input[name*='formatted_address']").val();
        // $("input[name*='mailed_postal_code']").val() == $("input[name*='postal_code']").val();
        // $("input[name*='mailed_locality']").val() == $("input[name*='locality']").val();
        // $("input[name*='mailed_administrative_area_level_1']").val() == $("input[name*='administrative_area_level_1']").val();      
    
    
});