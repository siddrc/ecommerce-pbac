ecommerceApp.controller('updateCategoriesController', updateCategoriesController);
updateCategoriesController.$inject = ['$scope', '$http', '$state', 'permissions', 'serviceHost','$rootScope'];

function updateCategoriesController(scope, http, state, permissions, serviceHost,rootScope) {
    scope.viewCategories = {};
    permissions.checkPermissionOnThisPage("isRead", "Categories");
    scope.viewCategories.load = function() {
        http.get('/ajax/category').success(function(response) {
            scope.viewCategories.categories = response.result
        }).error(genericAjaxErrorHandler);
    }
    scope.viewCategories.load();

    scope.viewCategories.view = function(categoryId) {
        scope.viewCategories.categoryId = categoryId;
        http.get('/ajax/category/detail?categoryId=' + categoryId).success(function(response) {
            scope.viewCategories.categoryName = response.result.name;
            $("#viewCategoryDetailsModal").modal();
        }).error(genericAjaxErrorHandler);
    }
    scope.viewCategories.updateCategory = function() {
        var updatedCategory = {
            "category": {
                id: scope.viewCategories.categoryId,
                name: scope.viewCategories.categoryName
            }
        }
        http.put('/ajax/category', updatedCategory).success(function() {
            $("#viewCategoryDetailsModal").modal('hide');
            dataSavedToDatabase("Category updated");
            scope.viewCategories.load();
            rootScope.loadCategories();
        }).error(genericAjaxErrorHandler)
    }

}
