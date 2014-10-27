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
        return currentHtml.replace(/-/g, '<br /> ');
    });
    //$('#registrationForm').data('bootstrapValidator').resetForm(); 
    //$( "#serverva_passed" ).fadeOut( 3000 );
});

socket.on('url2', function (data) {
    window.location.href=data; 
});

$(document).ready(function(){
  $(".va_error_btn").click(function(){
    $(".textva").fadeIn();
    $(".textva_passed").fadeIn();
  });
});

$(document).ready(function() {
    
    $('#serverva').css("display","none");
    $('#textva').css("display","none");
    $('#serverva_passed').css("display","none");
    $('#textva_passed').css("display","none");

    $('#registrationForm').find('[name="totalIncome"]').mask('99999999.00');
    $('#registrationForm').find('[name="wPhone"]').mask('000-000-0000');
    $('#registrationForm').find('[name="wPhonec"]').mask('000-000-0000');

    $('#registrationForm')
      
      .bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            // invalid: 'glyphicon glyphicon-remove',
            // validating: 'glyphicon glyphicon-refresh'
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
            months: {
                message: 'The months is not valid',
                validators: {
                    notEmpty: {
                        message: 'The months is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 5,
                        message: 'The months length  be less than 10 digits long'
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
            wPhone: {
                message: 'The phone number is not valid',
                validators: {
                    notEmpty: {
                        message: 'The phone number is required and cannot be empty'
                    },
                    stringLength: {
                        min: 10,
                        max: 12,
                        message: 'The numbers must be 10 digits long'
                    }, 
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The numbers can only consist of digits'
                    }                                                         
                }
            },  
            wPhoneext: {
                message: 'The number is not valid',
                validators: {
                    notEmpty: {
                        message: 'The phone number is required and cannot be empty'
                    },
                    stringLength: {
                        min: 2,
                        max: 10,
                        message: 'The numbers must be more than 2 digits long'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The numbers can only consist of number'
                    }                    
                }

            },  
            wPhonec: {
                message: 'The phone number is not valid',
                validators: {
                    notEmpty: {
                        message: 'The phone number is required and cannot be empty'
                    },
                    stringLength: {
                        min: 10,
                        max: 12,
                        message: 'The numbers must be 10 digits long'
                    }, 
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The numbers can only consist of digits'
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
                        message: 'The select is required and cannot be empty'
                    }
                }
            },  
            incomeType: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The type is required and cannot be empty'
                    }
                }
            }, 
            payrollType: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The type is required and cannot be empty'
                    }
                }
            },   
            holidaySkip: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The type is required and cannot be empty'
                    }
                }
            },    
            pfren: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The frequency is required and cannot be empty'
                    }
                }
            },                                     
            formatted_address: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The address is required and cannot be empty'
                    }
                }
            },               
            mailed_formatted_address: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The address is required and cannot be empty'
                    }
                }
            },  
            postal_code: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The post code is required and cannot be empty'
                    }
                }
            },               
            mailed_postal_code: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The post code is required and cannot be empty'
                    }
                }
            },   
            locality: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The city name is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The city can only consist of alphabetical'
                    },                     
                }
            },               
            mailed_locality: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The city name is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The city can only consist of alphabetical'
                    },                        
                }
            },        
            administrative_area_level_1: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The state name is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The state can only consist of alphabetical'
                    }, 
                }
            },               
            mailed_administrative_area_level_1: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The state name is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The state can only consist of alphabetical'
                    },                    
                }
            }, 
            employerName: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The name is required and cannot be empty'
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
            bankName: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The name is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The name can only consist of alphabetical'
                    },  
                }
            },  
            bankCity: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The city is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]+$/,
                        message: 'The city can only consist of alphabetical'
                    },                    
                }
            },                            
            bankState: {
                message: 'It is not valid',
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
            accountType: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The type is required and cannot be empty'
                    }
                }
            },   
            monthwithAccount: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The months is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The number can only consist of digits'
                    }                    
                }
            },  
            abaNumber: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The number is required and cannot be empty'
                    },
                    stringLength: {
                        min: 9,
                        max: 9,
                        message: 'The number length is not valid'
                    },                    
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'The number can only consist of digits'
                    }                    
                }
            },             
            accountNumber: {
                message: 'It is not valid',
                validators: {
                    notEmpty: {
                        message: 'The account is required and cannot be empty'
                    },
                    stringLength: {
                        min: 4,
                        max: 17,
                        message: 'The account length is not valid'
                    },                    
                    regexp: {
                        regexp: /^[a-zA-Z0-9]+$/,
                        message: 'The account can only consist of digits'
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

      socket.emit('client_data_2', {
                                  'fundType': $("input[name*='fundType']").val() , 
                                  'driLicense': $("input[name*='driLicense']").val() , 
                                  'isMilitary': $("input[name*='isMilitary']").val() ,
                                  'formatted_address': $("input[name*='formatted_address']").val() ,
                                  'postal_code': $("input[name*='postal_code']").val() ,
                                  'locality': $("input[name*='locality']").val() ,
                                  'administrative_area_level_1': $("input[name*='administrative_area_level_1']").val() ,
                                  'mailed_formatted_address': $("input[name*='mailed_formatted_address']").val() ,
                                  'mailed_postal_code': $("input[name*='mailed_postal_code']").val() ,
                                  'mailed_locality': $("input[name*='mailed_locality']").val() ,
                                  'mailed_administrative_area_level_1': $("input[name*='mailed_administrative_area_level_1']").val() ,

                                  'totalIncome': $("input[name*='totalIncome']").val() ,
                                  'incomeType': $("input[name*='incomeType']").val() , 
                                  'payrollType': $("input[name*='payrollType']").val() ,
                                  'holidaySkip': $("input[name*='holidaySkip']").val() ,
                                  'pfren': $("input[name*='pfren']").val() ,
                                  'employerName': $("input[name*='employerName']").val() ,
                                  'occupation': $("input[name*='occupation']").val() ,
                                  'workAddress': $("input[name*='workAddress']").val() ,
                                  'workCity': $("input[name*='workCity']").val() ,
                                  'workState': $("input[name*='workState']").val() ,
                                  'workZip': $("input[name*='workZip']").val() ,
                                  'wPhone': $("input[name*='wPhone']").val() ,
                                  'wPhoneext': $("input[name*='wPhoneext']").val() ,
                                  'wPhonec': $("input[name*='wPhonec']").val() ,

                                  'bankName': $("input[name*='bankName']").val() ,
                                  'bankCity': $("input[name*='bankCity']").val() ,
                                  'bankState': $("input[name*='bankState']").val() ,
                                  'abaNumber': $("input[name*='abaNumber']").val() ,
                                  'accountNumber': $("input[name*='accountNumber']").val() ,
                                  'accountType': $("input[name*='accountType']").val() ,
                                  'monthwithAccount': $("input[name*='monthwithAccount']").val() 

                                });          

    }); 

    // Reset button to help css style
    $('#rest_btn').click(function(){
        $('#registrationForm').data('bootstrapValidator').resetForm();  
    }) ; 
        
    $('#geocompletes').change(function(){
            $("input[name*='mailed_formatted_address']").val($("input[name*='formatted_address']").val());            
            $("input[name*='mailed_postal_code']").val($("input[name*='postal_code']").val());            
            $("input[name*='mailed_locality']").val($("input[name*='locality']").val());            
            $("input[name*='mailed_administrative_area_level_1']").val($("input[name*='administrative_area_level_1']").val());  
    }) ;        
    
    // $("input[name*='formatted_address']").change(function(){
    // //$("input[name*='formatted_address']").bind('propertychange keyup input paste', function(){        
    //         $("input[name*='or_formatted_address']").val($("input[name*='formatted_address']").val());            
    //         $("input[name*='or_postal_code']").val($("input[name*='postal_code']").val());            
    //         $("input[name*='or_locality']").val($("input[name*='locality']").val());            
    //         $("input[name*='or_administrative_area_level_1']").val($("input[name*='administrative_area_level_1']").val());  
    //         console.log('Input change value');
    // });             

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
            // $("input[name*='or_formatted_address']").val($("input[name*='formatted_address']").val());            
            // $("input[name*='or_postal_code']").val($("input[name*='postal_code']").val());            
            // $("input[name*='or_locality']").val($("input[name*='locality']").val());            
            // $("input[name*='or_administrative_area_level_1']").val($("input[name*='administrative_area_level_1']").val());              
            //$("input[name*='formatted_address']").hide();
            //$("input[name*='postal_code']").hide();
            //$("input[name*='locality']").hide();
            //$("input[name*='administrative_area_level_1']").hide();

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