var Form = function (info) {

	//Self constructors 
	this.data = {
		//1th step
		lonaAmount : null,
		firstName: null,
		middleName: null,
		lastName: null,
		ssn: null,
		homePhone: null,
		cellPhone: null,
		workPhone: null,
		payFreq: null,
		state: null,
		monthIncome: null,
		birth: null,
		email: null,
	};

    this.firstName = info.firstName;
    this.lastName = info.lastName; 
    this.lonaAmount = info.lamount;
    this.middleName = info.middleName; 
    this.ssn = info.ssn;
    this.hphone = info.homePhone; 
    this.cphone = info.cellPhone;
    this.wphone = info.workPhone;
    this.payFreq = info.payFreq;
    this.state = info.state; 
    this.monthIncome = info.monthIncome;
    this.birth = info.birth;    
    this.email = info.email; 

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];				
			}
		}		
	};

};

module.exports = function (info) {
	var instance = new Form(info);
	instance.fill(info);	
	return instance;
};
