ecommerceApp.controller('adminLandingPageController', adminLandingPageController);
adminLandingPageController.$inject = ['$scope', '$http', '$state'];

function adminLandingPageController(scope, http, state) {
    scope.adminLandingPage = {};
    http.get("/users/checkIfLoggedIn").success(function(response) {
        if (response) {
            scope.adminLandingPage.isLoggedIn = response.isLoggedIn;
            if (scope.adminLandingPage.isLoggedIn === 'N' || scope.adminLandingPage.isLoggedIn === undefined)
                state.go("landingPage");
        } else
            genericAjaxErrorHandler();
    }).error(genericAjaxErrorHandler);
}
