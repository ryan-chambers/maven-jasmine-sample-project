var validation = function() {
	var usernameValid = false;

	return {
		validateAlphaNumeric : function(field) {
			return /^[a-zA-Z\d]+$/.test(field.val());
		},

		validateUsername : function(field) {
			var username = field.val().replace(/\+/, '!');
			usernameValid = false;

			if ('' === username) {
				return false;
			}

			usernameValid = false;
			$.ajax({
				type : 'POST',
				url : '/validateUserName',
				data : {
					alias : escape(username)
				}
			}).done(function(result) {
					var resultNode, resultMessage;
					if (result != null) {
						resultNode = result.getElementsByTagName('result');
						if (resultNode.item(0) != null) {
							resultMessage = resultNode.item(0).firstChild.nodeValue;
							if ('valid' === resultMessage) {
								usernameValid = true;
							} else if ('username_already_used' === resultMessage) {
							} else {
							}
						}
					} else {
					}
				}
			).always(function() {
				console.log('always');
			});

			return usernameValid;
		},

		isUsernameValid : function() {
			return usernameValid;
		},

		reset : function() {
			usernameValid = false;
		}
	};
}();
