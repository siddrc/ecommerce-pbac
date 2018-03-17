ecommerceApp.controller('addAdminUsersController', addAdminUsersController);
addAdminUsersController.$inject = ['$scope', '$http', '$state', 'permissions', 'serviceHost'];

function addAdminUsersController(scope, http, state, permissions, serviceHost) {
    scope.addAdminUser = {};
    permissions.checkPermissionOnThisPage("isWrite", "AdminUser");
    scope.addAdminUser.password = "password123!";

    function getPolicies() {
        http.get('/policy/all').success(function(response) {
            scope.addAdminUser.policies = response.result
        }).error(genericAjaxErrorHandler);
    }
    getPolicies();

    scope.addAdminUser.create = function() {
        var adminUser = {
            "adminUser": {
                name: scope.addAdminUser.name,
                email: scope.addAdminUser.email,
                password: scope.addAdminUser.password,
                policyId: scope.addAdminUser.policy,
                "isCustomer": false,
                "isMerchant": false
            }
        }
        http.post('/ajax/adminUsers', adminUser).success(function(response) {
            scope.addAdminUser.name = "";
            scope.addAdminUser.email = "";
            scope.addAdminUser.policy = null;
            dataSavedToDatabase("Admin. User created.");
        }).error(genericAjaxErrorHandler)
    }
}
