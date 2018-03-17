ecommerceApp.controller('navbarController', navbarController);
navbarController.$inject = ['$scope', '$http', '$state', '$sessionStorage', 'serviceHost','$rootScope'];

function navbarController(scope, http, state, sessionStorage, serviceHost,rootScope) {
    scope.navbar = {};
    scope.navbar.showAdminFunctions = false;
    scope.navbar.categories = [];
    sessionStorage.isLoggedIn === "Y" ? sessionStorage.isLoggedIn = "Y" : sessionStorage.isLoggedIn = "N";
    scope.navbar.loadCustomerPolicyByDefault = function() {
        http.get('/policy').success(function(policyData) {}).error(genericAjaxErrorHandler);
    }
    scope.navbar.checkIfUserIsLoggedIn = function() {
        http.get("/users/checkIfLoggedIn").success(function(response) {
            if (response) {
                scope.navbar.isLoggedIn = response.isLoggedIn;
                if (scope.navbar.isLoggedIn === 'N' || scope.navbar.isLoggedIn === undefined)
                    scope.navbar.loadCustomerPolicyByDefault();
            } else
                genericAjaxErrorHandler();
        }).error(genericAjaxErrorHandler);
    }
    scope.navbar.checkIfUserIsLoggedIn();
    scope.navbar.loadMenu = function() {
        http.get('/menu').success(function(menuData) {
            scope.navbar.menuData = menuData.result;
            $('[data-submenu]').submenupicker();
        }).error(genericAjaxErrorHandler);
    }
    scope.navbar.loadMenu();
    scope.navbar.checkPolicy = function(typeOfAction, entity, destination) {
        http.get('/policy/check?typeOfAction=' + typeOfAction + '&entity=' + entity).success(function(checkPolicyResponse) {
            if (checkPolicyResponse === 'Y') {
                state.go(destination)
            } else {
                showErrorMessage("Not permitted, as per policy.")
            }
        }).error(genericAjaxErrorHandler);
    }
    scope.navbar.loadCategories = function() {
        http.get('/category').success(function(response) {
            scope.navbar.categories = response.result;
        }).error(genericAjaxErrorHandler);
    }
    scope.navbar.loadCategories();
    rootScope.loadCategories = function(){
        scope.navbar.loadCategories();
    }
    scope.navbar.showProductsAsPerCategory = function(categoryId) {
       state.go('productsAsPerCategory',{category:categoryId})
    }
}
