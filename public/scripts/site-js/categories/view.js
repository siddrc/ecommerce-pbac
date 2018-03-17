ecommerceApp.controller('viewCategoriesController', viewCategoriesController);
viewCategoriesController.$inject = ['$scope', '$http', '$state', 'permissions', 'serviceHost'];

function viewCategoriesController(scope, http, state, permissions, serviceHost) {
    scope.viewCategories = {};
    permissions.checkPermissionOnThisPage("isRead", "Categories");
    http.get('/ajax/category').success(function(response) {
        scope.viewCategories.categories = response.result
    }).error(genericAjaxErrorHandler);
   
    scope.viewCategories.view = function(categoryId) {
        http.get('/ajax/category/detail?categoryId=' + categoryId).success(function(response) {
            scope.viewCategories.categoryName = response.result.name;
            $("#viewCategoryDetailsModal").modal();
        }).error(genericAjaxErrorHandler);
    }
    
}
