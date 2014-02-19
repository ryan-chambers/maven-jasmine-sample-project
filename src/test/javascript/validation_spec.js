describe('alphanumeric validation', function() {
	it('should detect valid alphanumeric sequences', function() {
		var field = $('<input type="text" id="test_field" value="aB1" />'),
			isValidAlphaNumeric = validation.validateAlphaNumeric(field);
		expect(isValidAlphaNumeric).toEqual(true);
	});

	it('should detect invalid alphanumeric sequences', function() {
		var field = $('<input type="text" id="test_field" value="ab@google.com" />'),
			isValidAlphaNumeric = validation.validateAlphaNumeric(field);
		expect(isValidAlphaNumeric).toEqual(false);
	});
});

describe('user name validation', function() {
	function createFakeResponse(responseCode) {
	    return [
		 	200,
		 	{ "Content-Type": "text/xml" },
		 	'<?xml version="1.0" encoding="UTF-8"?><result>' + responseCode + '</result>'
		];
	}

	function callValidation(field, server) {
		validation.validateUsername(field);

		server.respond();

		return validation.isUsernameValid();
	}

	beforeEach(function() {
		validation.reset();
	    this.server = sinon.fakeServerWithClock.create();
	    this.field = $('<input type="text" id="test_field" value="aB1" />');
	});

	it('should detect if the user name has already been used', function() {
		var isValid;

		this.server.respondWith(createFakeResponse('username_already_used'));

		isValid = callValidation(this.field, this.server);

		expect(isValid).toEqual(false);
	});

	it('should detect if the user name is valid', function() {
		var isValid;

		this.server.respondWith(createFakeResponse('valid'));

		isValid = callValidation(this.field, this.server);

		expect(isValid).toEqual(true);
	});
});