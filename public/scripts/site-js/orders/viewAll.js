ecommerceApp.controller('viewAllOrdersController', viewAllOrdersController);
viewAllOrdersController.$inject = ['$scope', '$http', '$state', 'permissions'];

function viewAllOrdersController(scope, http, state, permissions) {
    scope.viewOrders = {};
    permissions.checkPermissionOnThisPage("isRead", "Orders");
    http.get("/ajax/orders/all").success(function(response) {
        scope.viewOrders.orders = response.result;
    }).error(genericAjaxErrorHandler);
    scope.viewOrders.viewOrder = function(orderId) {
        state.go("viewOrder", { orderId: orderId })
    }
}
