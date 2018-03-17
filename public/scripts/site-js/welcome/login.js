ecommerceApp.controller('loginController', loginController);
loginController.$inject = ['$scope', '$http', '$state', 'authService', 'serviceHost', '$rootScope'];

function loginController(scope, http, state, authService, serviceHost, rootScope) {
    scope.login = {};
    rootScope.showAdminFunctions = false;
    rootScope.showMerchantFunctions = false;
    scope.login.checkIfUserIsLoggedIn = function() {
        http.get("/users/checkIfLoggedIn").success(function(response) {
            if (response) {
                scope.isLoggedIn = response.isLoggedIn;
                scope.loggedInUserName = response.loggedInUserName;
            } else
                genericAjaxErrorHandler();
        }).error(genericAjaxErrorHandler);
    }
    scope.login.checkIfUserIsLoggedIn();
    scope.login.postLoginSuccess = function(postAuthLoginData) {
        scope.isLoggedIn = "Y";
        scope.loggedInUserName = postAuthLoginData.result[0].name;
        authService.loginConfirmed();
        var whoAmI = postAuthLoginData.whoAmI;
        var resultantState = getState(whoAmI);
        state.go(resultantState);
    }

    function getState(whoAmI) {
        if (whoAmI === "customer") {
            rootScope.showAdminFunctions = false;
            rootScope.showMerchantFunctions = false;
            return "landingPage";
        } else if (whoAmI === "merchant") {
            rootScope.showAdminFunctions = false;
            rootScope.showMerchantFunctions = true;
            return "merchantLandingPage";
        } else if (whoAmI === "admin") {
            rootScope.showAdminFunctions = true;
            rootScope.showMerchantFunctions = false;
            return "adminLandingPage";
        }
    }
    scope.login.postLoginFailure = function() {
        showErrorMessage("Invalid email/password combination")
    }
    scope.login.postLoginProcessing = function(postAuthLoginData) {
        if (postAuthLoginData.result.length > 0) {
            scope.login.postLoginSuccess(postAuthLoginData);
        } else {
            scope.login.postLoginFailure();
        }
    }
    scope.login.processLogin = function() {
        http.get('/users/authUser?userEmail=' + scope.login.userEmail + '&userPassword=' + scope.login.userPassword).success(function(postAuthLoginData) {
            scope.login.postLoginProcessing(postAuthLoginData);
        }).error(genericAjaxErrorHandler);
    }
    scope.login.openSignUpDialogForCustomers = function() {

    }
    scope.login.openSignUpDialogForMerchants = function() {

    }
    scope.login.logOut = function() {
        http.get("/users/logout").success(function(response) {
            scope.isLoggedIn = "N";
            scope.loggedInUserName = "";
            scope.login.userEmail = "";
            scope.login.userPassword = "";
            rootScope.showAdminFunctions = false;
            rootScope.showMerchantFunctions = false;
            state.go('landingPage')
            showSuccessMessage("You have logged out successfully, default policy applied.");
        }).error(genericAjaxErrorHandler);
    }
    scope.login.openCustomerSignUp = function() {
        state.go('customerSignup')
    }
    scope.login.openMerchantSignUp = function() {
        state.go('merchantSignup')
    }
}
