ecommerceApp.controller('deletePoliciesController', deletePoliciesController);
deletePoliciesController.$inject = ['$scope', '$http', '$state', 'permissions', 'serviceHost'];

function deletePoliciesController(scope, http, state, permissions, serviceHost) {
    scope.deletePolicies = {};
    permissions.checkPermissionOnThisPage("isDelete", "Policies");

    scope.deletePolicies.load = function() {
        http.get('/policy/all').success(function(response) {
            scope.deletePolicies.policies = response.result
        }).error(genericAjaxErrorHandler);
    }
    scope.deletePolicies.load();

    scope.deletePolicies.deletePolicy = function(policyId) {
        if (confirm("Do you want to delete this policy? (Note:please note that the users associated with this policy will not be be able to login, once this policy is deleted)")) {
            http.delete('/ajax/policy/' + policyId).success(function(response) {
                scope.deletePolicies.load();
                dataSavedToDatabase(response.msg);
            }).error(function(response) {
                showErrorMessage(response.msg);
            });
        }
    }
}
