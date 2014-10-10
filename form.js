var Form = function () {
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

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

};

module.exports = function (info) {
	var instance = new Form();
	instance.fill(info);
	return instance;
};