ecommerceApp.controller('productsAsPerCategoryController', productsAsPerCategoryController);
productsAsPerCategoryController.$inject = ['$scope', '$http', '$state', 'permissions','$stateParams'];

function productsAsPerCategoryController(scope, http, state, permissions,stateParams) {
    scope.products = {};
    scope.products.count = 0;
    permissions.checkPermissionOnThisPage("isRead", "Products");
    var categoryId = stateParams.category;
    http.get('/productsAsPerCategory/totalCount?category='+categoryId).success(function(products) {
        scope.products.count = products.result;
        scope.products.loadPage(1, 0, 12);
    }).error(genericAjaxErrorHandler);
    
    scope.products.loadPage = function(pageNumber, skip, limit) {
        scope.products.currentPage = pageNumber;
        scope.products.currentSkip = skip;
        scope.products.limit = limit

        http.get("/productsAsPerCategory?skip=" + skip + "&limit=" + limit+"&category="+categoryId).success(function(products) {
            scope.products.data1 = [];
            scope.products.data2 = [];
            scope.products.data3 = [];
            scope.products.data4 = [];

            products.result.forEach(function(item, itemIndex) {
                if (0 <= itemIndex && itemIndex < 3) {
                    scope.products.data1.push(item)
                }
                if (3 <= itemIndex && itemIndex < 6) {
                    scope.products.data2.push(item)
                }
                if (6 <= itemIndex && itemIndex < 9) {
                    scope.products.data3.push(item)
                }
                if (9 <= itemIndex && itemIndex < 12) {
                    scope.products.data4.push(item)
                }
            })


        }).error(genericAjaxErrorHandler);
    }
    scope.products.olderPage = function() {
        if ((scope.products.currentPage - 1) >= 0) {
            scope.products.currentPage = scope.products.currentPage - 1;
            scope.products.currentSkip = scope.products.currentPage * 12;
            scope.products.limit = scope.products.limit;
            scope.products.loadPage(scope.products.currentPage, scope.products.currentSkip, 12);
        }

    }
    scope.products.nextPage = function() {
        if (scope.products.currentPage != 0) {
            scope.products.currentPage = scope.products.currentPage + 1;
            scope.products.currentSkip = scope.products.currentPage * 12;
            scope.products.limit = scope.products.limit
            if (scope.products.currentSkip < scope.products.count)
                scope.products.loadPage(scope.products.currentPage, scope.products.currentSkip, 12);
        }

    }
    scope.products.productDetails = function(productId) {
        state.go('productDetails', { productId: productId })
    }
}
