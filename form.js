var Form = function () {
	this.data = {
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
		email: null
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