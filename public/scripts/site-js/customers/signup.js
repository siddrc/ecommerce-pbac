ecommerceApp.controller('customerSignupController', customerSignupController);
customerSignupController.$inject = ['$scope', '$http', '$state'];

function customerSignupController(scope, http, state) {
    scope.customerSignup = {};
    scope.customerSignup.emailNotUnique = true;
    scope.customerSignup.notSamePassword = true;
    scope.customerSignup.checkUniqueEmail = function() {
        if (scope.customerSignup.email !== undefined) {
            http.get('/users/uniqueEmail?email=' + scope.customerSignup.email).success(function(response) {
                var count = parseInt(response.result);
                if (count === 0) {
                    scope.customerSignup.emailNotUnique = false;
                    showSuccessMessage("Email id is valid for sign-up")
                } else {
                    scope.customerSignup.emailNotUnique = true;
                    showErrorMessage("Email id already exists.")
                }
            }).error(genericAjaxErrorHandler);
        }
    }
    scope.customerSignup.checkPassword = function() {
        if (scope.customerSignup.password !== undefined && scope.customerSignup.confirmPassword !== undefined) {
            if (scope.customerSignup.password === scope.customerSignup.confirmPassword) {
                scope.customerSignup.notSamePassword = false;
                showSuccessMessage("Passwords match.")
            } else {
                scope.customerSignup.notSamePassword = true;
                showErrorMessage("Passwords do not match.")
            }
        }

    }
    scope.customerSignup.signUp = function() {
        var customer = {
            "customer": {
                name: scope.customerSignup.name,
                email: scope.customerSignup.email,
                password: scope.customerSignup.password,
                isCustomer: true,
                isMerchant: false
            }
        }
        if (!(scope.customerSignup.emailNotUnique && scope.customerSignup.notSamePassword))
            http.post("/users/customer", customer).success(function(response) {
                scope.customerSignup.name = "";
                scope.customerSignup.email = "";
                scope.customerSignup.password = "";
                scope.customerSignup.confirmPassword = "";
                showSuccessMessage("Customer created.")
            }).error(genericAjaxErrorHandler)
    }

}
