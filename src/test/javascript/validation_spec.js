var utils = {};

describe('validation', function() {
	it('should detect valid alphanumeric sequences', function() {
		var isValidAlphaNumeric = validation.isAlphaNumeric('aA1');
		expect(isValidAlphaNumeric).toEqual(true);
	});

	it('should detect invalid alphanumeric sequences', function() {
		var isValidAlphaNumeric = validation.isAlphaNumeric('ab@google.com');
		expect(isValidAlphaNumeric).toEqual(false);
	});
});