ecommerceApp.controller('deleteOrdersController', deleteOrdersController);
deleteOrdersController.$inject = ['$scope', '$http', '$state', 'permissions'];

function deleteOrdersController(scope, http, state, permissions, serviceHost) {
    scope.deleteOrders = {};
    permissions.checkPermissionOnThisPage("isDelete", "Orders");

    function loadOrders() {
        http.get("/ajax/orders/all").success(function(response) {
            scope.deleteOrders.orders = response.result;
        }).error(genericAjaxErrorHandler);
    }
    loadOrders();
    scope.deleteOrders.delete = function(orderId) {
        if (confirm("Are you sure, you want to delete this order?")) {
            http.delete("/ajax/orders/" + orderId).success(function(response) {
                showSuccessMessage("Order is deleted.");
                loadOrders();
            }).error(genericAjaxErrorHandler)
        }
    }
}
