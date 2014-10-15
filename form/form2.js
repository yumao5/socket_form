var Form = function (info) {
	this.data = {
		
		// 2th step
		fundType: null,
		driLicense: null,
		isMilitary: null,
		formatted_address: null,
		postal_code: null,
		locality: null,
		administrative_area_level_1: null,
		mailed_formatted_address: null,
		mailed_postal_code: null,
		mailed_locality: null,
		mailed_administrative_area_level_1: null,
		totalIncome: null,
		incomeType: null,
		payrollType: null,
		holidaySkip: null,
		employerName: null,
		occupation: null,
		workAddress: null,
		workCity: null,
		workState: null,
		workZip: null,
		wPhone: null,
		wPhoneext: null,
		wPhonec: null,
		bankName: null,
		bankCity: null,
		bankState: null,
		abaNumber: null,
		accountNumber: null,
		accountType: null,
		monthwithAccount: null,
	};

    this.fundType = info.fundType;
    this.driLicense = info.driLicense; 
    this.isMilitary = info.isMilitary;
    this.formatted_address = info.formatted_address; 
    this.postal_code = info.postal_code;
    this.locality = info.locality; 
    this.administrative_area_level_1 = info.administrative_area_level_1;
    this.mailed_formatted_address = info.mailed_formatted_address;
    this.mailed_postal_code = info.mailed_postal_code;
    this.mailed_locality = info.mailed_locality; 
    this.mailed_administrative_area_level_1 = info.mailed_administrative_area_level_1;
    
    this.totalIncome = info.totalIncome;    
    this.incomeType = info.incomeType; 
    this.payrollType = info.payrollType; 
    this.holidaySkip = info.holidaySkip; 
    this.pfren = info.pfren; 
    this.employerName = info.employerName; 
    this.workAddress = info.workAddress; 
    this.workCity = info.workCity; 
    this.workState = info.workState; 
    this.workZip = info.workZip; 
    this.wPhone = info.wPhone; 
    this.wPhoneext = info.wPhoneext; 
    this.wPhonec = info.wPhonec; 

    this.bankName = info.bankName; 
    this.bankCity = info.bankCity; 
    this.bankState = info.bankState; 
    this.abaNumber = info.abaNumber; 
    this.accountNumber = info.accountNumber;
    this.accountType = info.accountType;
    this.monthwithAccount = info.monthwithAccount;  

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