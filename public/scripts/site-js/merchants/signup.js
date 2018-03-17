ecommerceApp.controller('merchantSignupController', merchantSignupController);
merchantSignupController.$inject = ['$scope', '$http', '$state'];

function merchantSignupController(scope, http, state) {
    scope.merchantSignup = {};
    scope.merchantSignup.emailNotUnique = true;
    scope.merchantSignup.notSamePassword = true;
    scope.merchantSignup.checkUniqueEmail = function() {
        if (scope.merchantSignup.email !== undefined) {
            http.get('/users/uniqueEmail?email=' + scope.merchantSignup.email).success(function(response) {
                var count = parseInt(response.result);
                if (count === 0) {
                    scope.merchantSignup.emailNotUnique = false;
                    showSuccessMessage("Email id is valid for sign-up")
                } else {
                    scope.merchantSignup.emailNotUnique = true;
                    showErrorMessage("Email id already exists.")
                }
            }).error(genericAjaxErrorHandler);
        }
    }
    scope.merchantSignup.checkPassword = function() {
        if (scope.merchantSignup.password !== undefined && scope.merchantSignup.confirmPassword !== undefined) {
            if (scope.merchantSignup.password === scope.merchantSignup.confirmPassword) {
                scope.merchantSignup.notSamePassword = false;
                showSuccessMessage("Passwords match.")
            } else {
                scope.merchantSignup.notSamePassword = true;
                showErrorMessage("Passwords do not match.")
            }
        }

    }
    scope.merchantSignup.signUp = function() {
        var merchant = {
            "merchant": {
                name: scope.merchantSignup.name,
                email: scope.merchantSignup.email,
                password: scope.merchantSignup.password,
                isCustomer: false,
                isMerchant: true
            }
        }
        if (!(scope.merchantSignup.emailNotUnique && scope.merchantSignup.notSamePassword))
            http.post("/users/merchant", merchant).success(function(response) {
                scope.merchantSignup.name = "";
                scope.merchantSignup.email = "";
                scope.merchantSignup.password = "";
                scope.merchantSignup.confirmPassword = "";
                showSuccessMessage("Merchant created.")
            }).error(genericAjaxErrorHandler)
    }

}
