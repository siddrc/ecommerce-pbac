ecommerceApp.controller('addMerchantProductsController', addMerchantProductsController);
addMerchantProductsController.$inject = ['$scope', '$http', '$state', 'permissions'];

function addMerchantProductsController(scope, http, state, permissions) {
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
                "category": scope.addProducts.category
            }
        }
        http.post("/ajax/merchant/products", product).success(function(response) {
            state.go("addProductImage", { targetProductId: response })
        }).error(genericAjaxErrorHandler);
    }
}
