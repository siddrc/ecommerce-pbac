ecommerceApp.controller('merchantProductDetailsController', merchantProductDetailsController);
merchantProductDetailsController.$inject = ['$scope', '$http', '$state', 'permissions', '$stateParams'];

function merchantProductDetailsController(scope, http, state, permissions, stateParams) {
    var productId = stateParams.productId;
    scope.productDetails = {};
    scope.productDetails.productId = productId;
    http.get("/products/product/details?id=" + productId).success(function(response) {
        scope.productDetails.data = response.result;
        scope.productDetails.data.orderCost = scope.productDetails.data.productCost;
    }).error(genericAjaxErrorHandler);
}
