ecommerceApp.controller('viewAdminUsersController', viewAdminUsersController);
viewAdminUsersController.$inject = ['$scope', '$http', '$state', 'permissions'];

function viewAdminUsersController(scope, http, state, permissions) {
   scope.viewAdmins = {};
   permissions.checkPermissionOnThisPage("isRead", "AdminUser");
    http.get('/ajax/adminUsers').success(function(response) {
        scope.viewAdmins.users = response.result
    }).error(genericAjaxErrorHandler);
   
    scope.viewAdmins.view = function(adminUserId) {
        http.get('/ajax/adminUsers/detail?adminUserId=' + adminUserId).success(function(response) {
            scope.viewAdmins.adminName = response.result.name;
             scope.viewAdmins.email = response.result.email;
            $("#viewAdminUserModal").modal();
        }).error(genericAjaxErrorHandler);
    }
}
