ecommerceApp.controller('merchantLandingPageController', merchantLandingPageController);
merchantLandingPageController.$inject = ['$scope', '$http', '$state'];

function merchantLandingPageController(scope, http, state) {
    scope.merchantLandingPage = {};
    http.get("/users/checkIfLoggedIn").success(function(response) {
        if (response) {
            scope.merchantLandingPage.isLoggedIn = response.isLoggedIn;
            if (scope.merchantLandingPage.isLoggedIn === 'N' || scope.merchantLandingPage.isLoggedIn === undefined)
                state.go("landingPage");
        } else
            genericAjaxErrorHandler();
    }).error(genericAjaxErrorHandler);
}
