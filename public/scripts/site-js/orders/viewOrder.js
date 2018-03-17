ecommerceApp.controller('viewOrderController', viewOrderController);
viewOrderController.$inject = ['$scope', '$http', '$state', 'permissions', '$stateParams'];

function viewOrderController(scope, http, state, permissions, stateParams) {
    scope.viewOrder = {};
    permissions.checkPermissionOnThisPage("isRead", "Orders");
    var orderId = stateParams.orderId;
    http.get("/ajax/orders?id=" + orderId).success(function(response){
       scope.viewOrder = response.result;
    }).error(genericAjaxErrorHandler);

}
