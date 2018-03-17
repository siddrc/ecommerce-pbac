ecommerceApp.controller('deleteCustomerController', deleteCustomerController);
deleteCustomerController.$inject = ['$scope', '$http', '$state', 'permissions'];

function deleteCustomerController(scope, http, state, permissions) {
    scope.deleteCustomers = {};
    permissions.checkPermissionOnThisPage("isDelete", "Customers");
    scope.deleteCustomers.load = function() {
        http.get('/ajax/users/customers').success(function(response) {
            scope.deleteCustomers.users = response.result;
        }).error(genericAjaxErrorHandler);
    }
    scope.deleteCustomers.load();
    scope.deleteCustomers.delete = function(customerId) {
        if (confirm("Are you sure, you want to delete this customer?")) {
            http.delete('/ajax/users/customers/' + customerId).success(function(response) {
                showSuccessMessage(response.msg);
                scope.deleteCustomers.load();
            }).error(function(response) {
                showErrorMessage(response.msg)
            })
        }
    }
}
