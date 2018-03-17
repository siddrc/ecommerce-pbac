ecommerceApp.controller('viewProductsController', viewProductsController);
viewProductsController.$inject = ['$scope', '$http', '$state', 'permissions'];

function viewProductsController(scope, http, state, permissions) {
    permissions.checkPermissionOnThisPage("isRead", "Products");
    scope.viewProducts = {};
    scope.viewProducts.data = {};

    http.get('/ajax/products?skip=0&limit=12').success(function(products) {
        scope.viewProducts.data = products;
    }).error(genericAjaxErrorHandler);
}
