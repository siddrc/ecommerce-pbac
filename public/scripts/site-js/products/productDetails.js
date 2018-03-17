ecommerceApp.controller('productDetailsController', productDetailsController);
productDetailsController.$inject = ['$scope', '$http', '$state', 'permissions', '$stateParams'];

function productDetailsController(scope, http, state, permissions, stateParams) {
    var productId = stateParams.productId;
    scope.productDetails = {};
    scope.productDetails.productId = productId;
    scope.productDetails.boughtQuantity = 1;
    http.get("/products/product/details?id=" + productId).success(function(response) {
        scope.productDetails.data = response.result;
        scope.productDetails.data.orderCost = scope.productDetails.data.productCost;
    }).error(genericAjaxErrorHandler);

    scope.productDetails.buyNow = function() {
        scope.productDetails.checkIfUserIsLoggedIn()
    }
    scope.productDetails.checkIfUserIsLoggedIn = function() {
        http.get("/users/checkIfLoggedIn").success(function(response) {
            if (response) {
                scope.productDetails.isLoggedIn = response.isLoggedIn;
                if (scope.productDetails.isLoggedIn === 'N' || scope.productDetails.isLoggedIn === undefined) {
                    showErrorMessage("Please log-in.")
                } else {
                    scope.productDetails.createOrder();
                }

            } else
                genericAjaxErrorHandler();
        }).error(genericAjaxErrorHandler);
    }
    scope.productDetails.changeQuanity = function() {
        scope.productDetails.data.orderCost = parseInt(scope.productDetails.boughtQuantity) * parseInt(scope.productDetails.data.productCost);
    }
    scope.productDetails.createOrder = function() {
        var order = {
            "order": {
                image: scope.productDetails.data.image,
                productName: scope.productDetails.data.productName,
                productDescription: scope.productDetails.data.productDescription,
                productId: scope.productDetails.productId,
                cost: scope.productDetails.data.productCost,
                orderValue:scope.productDetails.data.orderCost,
                status: "New",
                paid: "No",
                quantity: scope.productDetails.boughtQuantity,
                complete:"No",
                receivedPayment:"No"
            }
        }
        http.post("/ajax/orders", order).success(function(orderId) {
            showSuccessMessage("Order Created");
            state.go('orderPage', { orderId: orderId })
        }).error(genericAjaxErrorHandler)
    };
}
