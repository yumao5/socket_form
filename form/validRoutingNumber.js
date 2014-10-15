var va = require('validator');

function validRoutingNumber (routing) {

    // all valid routing numbers are 9 numbers in length
    if (routing.length !== 9) {
        return false;
    }

    // if it aint a number, it aint a routin' number
    if ( !va.isNumeric( routing ) ) {
        return false;
    }

    // routing numbers starting with 5 are internal routing numbers
    // usually found on bank deposit slips
    if ( routing[0] == '5' ) {
        return false;
    }
    
    // http://en.wikipedia.org/wiki/Routing_transit_number#MICR_Routing_number_format
    var checksumTotal = (7 * (parseInt(routing.charAt(0),10) + parseInt(routing.charAt(3),10) + parseInt(routing.charAt(6),10))) +
                        (3 * (parseInt(routing.charAt(1),10) + parseInt(routing.charAt(4),10) + parseInt(routing.charAt(7),10))) +
                        (9 * (parseInt(routing.charAt(2),10) + parseInt(routing.charAt(5),10) + parseInt(routing.charAt(8),10)));
    
    var checksumMod = checksumTotal % 10;
    if (checksumMod !== 0) {
        return false;
    } else {
        return true;
    }
};

module.exports.validRoutingNumber = validRoutingNumber;
