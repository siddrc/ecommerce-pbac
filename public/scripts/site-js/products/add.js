ecommerceApp.controller('addProductsController', addProductsController);
addProductsController.$inject = ['$scope', '$http', '$state', 'permissions'];

function addProductsController(scope, http, state, permissions) {
    permissions.checkPermissionOnThisPage("isWrite", "Products");
    scope.addProducts = {};
    scope.addProducts.loadCategories = function() {
        http.get('/ajax/category').success(function(response) {
            scope.addProducts.categories = response.result
        }).error(genericAjaxErrorHandler);
    }
    scope.addProducts.loadCategories();
    scope.addProducts.create = function() {
        var product = {
            "product": {
                "productName": scope.addProducts.productName,
                "productDescription": scope.addProducts.productDescription,
                "productCost": scope.addProducts.productCost,
                "merchant": "System",
                "category": scope.addProducts.category
            }
        }
        http.post("/ajax/products", product).success(function(response) {
            state.go("addProductImage", { targetProductId: response })
        }).error(genericAjaxErrorHandler);
    }
}
