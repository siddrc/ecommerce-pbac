ecommerceApp.controller('addCategoriesController', addCategoriesController);
addCategoriesController.$inject = ['$scope', '$http', '$state', 'permissions','$rootScope'];

function addCategoriesController(scope, http, state, permissions,rootScope) {
    permissions.checkPermissionOnThisPage("isWrite", "Categories");
    scope.addCategories = {};
    scope.addCategories.create = function(){
    	var category = {
    		"category" :{
    			"name": scope.addCategories.categoryName
    		}
    	}
    	http.post("/ajax/category",category).success(function(){
    		dataSavedToDatabase("Category created successfully.");
            rootScope.loadCategories()
    	}).error(genericAjaxErrorHandler);
    }

}
