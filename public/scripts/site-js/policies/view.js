ecommerceApp.controller('viewPoliciesController', viewPoliciesController);
viewPoliciesController.$inject = ['$scope', '$http', '$state', 'permissions', 'serviceHost'];

function viewPoliciesController(scope, http, state, permissions, serviceHost) {
    scope.viewPolicies = {};
    permissions.checkPermissionOnThisPage("isRead", "Policies");
    http.get('/policy/all').success(function(response) {
        scope.viewPolicies.policies = response.result
    }).error(genericAjaxErrorHandler);
    http.get("/ajax/policyMaster").success(function(response) {
        scope.viewPolicies.policyMaster = response.result;
        http.get("/ajax/policyMasterPermissionTypes").success(function(response) {
            scope.viewPolicies.policyMasterPermissionTypes = response.result;
        }).error(genericAjaxErrorHandler);
    }).error(genericAjaxErrorHandler);
    scope.viewPolicies.view = function(policyId) {
        http.get('/policy/detail?policyId=' + policyId).success(function(response) {
            scope.viewPolicies.policy = response.result;
            scope.viewPolicies.policyName = response.result.name
            scope.viewPolicies.policy = response.result.policy;
            $("#viewPolicyDetailsModal").modal();
        }).error(genericAjaxErrorHandler);
    }
    scope.viewPolicies.checkPermission = function(policyMasterName, policyMasterPermissionTypesName) {
        if (scope.viewPolicies.policy.hasOwnProperty(policyMasterName)) {
            var policyMaster = scope.viewPolicies.policy[policyMasterName];
            if (policyMaster.hasOwnProperty(policyMasterPermissionTypesName)) {
                if (policyMaster[policyMasterPermissionTypesName] === "Y")
                    return true;
                else
                    return false;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
