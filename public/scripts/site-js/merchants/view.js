ecommerceApp.controller('viewMerchantsController', viewMerchantsController);
viewMerchantsController.$inject = ['$scope', '$http', '$state'];

function viewMerchantsController(scope, http, state) {
    scope.viewMerchants = {};
    http.get("/ajax/users/merchants").success(function(response) {
        scope.viewMerchants.merchants = response.result;
    }).error(genericAjaxErrorHandler)
}
