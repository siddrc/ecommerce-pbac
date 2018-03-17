ecommerceApp.controller('deleteCategoriesController', deleteCategoriesController);
deleteCategoriesController.$inject = ['$scope', '$http', '$state', 'permissions', 'serviceHost', '$rootScope'];

function deleteCategoriesController(scope, http, state, permissions, serviceHost, rootScope) {
    scope.viewCategories = {};
    permissions.checkPermissionOnThisPage("isRead", "Categories");
    scope.viewCategories.load = function() {
        http.get('/ajax/category').success(function(response) {
            scope.viewCategories.categories = response.result
        }).error(genericAjaxErrorHandler);
    }
    scope.viewCategories.load();

    scope.viewCategories.view = function(categoryId) {
        http.get('/ajax/category/detail?categoryId=' + categoryId).success(function(response) {
            scope.viewCategories.categoryId = categoryId;
            scope.viewCategories.categoryName = response.result.name;
            $("#viewCategoryDetailsModal").modal();
        }).error(genericAjaxErrorHandler);
    }
    scope.viewCategories.delete = function(categoryId) {
        if (confirm("Deleting the category will orphan the products associated with it as well.Are you sure?")) {
            var deletedCategory = {
                "category": {
                    id: categoryId
                }
            }
            http.delete('/ajax/category/' + categoryId).success(function(response) {
                showSuccessMessage(response.msg);
                scope.viewCategories.load();
                rootScope.loadCategories();
            }).error(function(response) {
                showErrorMessage(response.msg)
            })
        }

    }

}
