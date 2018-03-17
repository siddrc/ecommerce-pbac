ecommerceApp.controller('viewCustomersController', viewCustomersController);
viewCustomersController.$inject = ['$scope', '$http', '$state'];

function viewCustomersController(scope, http, state) {
    scope.viewCustomers = {};
    http.get("/ajax/users/customers").success(function(response) {
        scope.viewCustomers.customers = response.result;
    }).error(genericAjaxErrorHandler)
}
