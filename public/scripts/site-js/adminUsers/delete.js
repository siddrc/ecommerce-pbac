ecommerceApp.controller('deleteAdminUsersController', deleteAdminUsersController);
deleteAdminUsersController.$inject = ['$scope', '$http', '$state', 'permissions'];

function deleteAdminUsersController(scope, http, state, permissions) {
    scope.deleteAdminUsers = {};
    permissions.checkPermissionOnThisPage("isRead", "Categories");
    scope.deleteAdminUsers.load = function() {
        http.get('/ajax/adminUsers').success(function(response) {
           scope.deleteAdminUsers.users = response.result;
        }).error(genericAjaxErrorHandler);
    }
    scope.deleteAdminUsers.load();
    scope.deleteAdminUsers.delete = function(userId) {
        if (confirm("Are you sure, you want to delete this admin user?")) {
            http.delete('/ajax/adminUsers/deleteAdmin/'+userId).success(function() {
                dataSavedToDatabase("Admin user is deleted.");
                scope.deleteAdminUsers.load();
            }).error(genericAjaxErrorHandler)
        }

    }

}