ecommerceApp.controller('orderPageController', orderPageController);
orderPageController.$inject = ['$scope', '$http', '$state', 'permissions', '$stateParams'];

function orderPageController(scope, http, state, permissions, stateParams) {
    scope.order = {};
    scope.order.id = stateParams.orderId;
    scope.order.data = {};
    http.get("/ajax/orders?id=" + scope.order.id).success(function(response) {
        scope.order.data = response.result;
    }).error(genericAjaxErrorHandler);
    scope.order.confirmOrder = function() {
        var order = {
            "order": {
                "id": scope.order.id,
                "deliveryAddress": scope.order.deliveryAddress,
                "comments": scope.order.comments
            }
        }
        http.put("/ajax/orders", order).success(function(response) {
            showSuccessMessage("Order is confirmed..heading to payment gateway.");
            state.go("logicalEnd")
        }).error(genericAjaxErrorHandler)
    }
    scope.order.cancelOrder = function() {
        var order = {
            "order": {
                "id": scope.order.id
            }
        }
        if (confirm("Are sure you want to cancel this order?")) {
            http.delete("/ajax/orders/"+scope.order.id).success(function(response) {
                showErrorMessage("Order is cancelled.");
                state.go('landingPage');
            }).error(genericAjaxErrorHandler)
        }


    }
}
