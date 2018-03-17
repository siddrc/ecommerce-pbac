ecommerceApp.controller('updatePoliciesController', updatePoliciesController);
updatePoliciesController.$inject = ['$scope', '$http', '$state', 'permissions', 'serviceHost'];

function updatePoliciesController(scope, http, state, permissions, serviceHost) {
    scope.updatePolicies = {};
    permissions.checkPermissionOnThisPage("isRead", "Policies");
    http.get('/policy/all').success(function(response) {
        scope.updatePolicies.policies = response.result
    }).error(genericAjaxErrorHandler);
    http.get("/ajax/policyMaster").success(function(response) {
        scope.updatePolicies.policyMaster = response.result;
        http.get( "/ajax/policyMasterPermissionTypes").success(function(response) {
            scope.updatePolicies.policyMasterPermissionTypes = response.result;
        }).error(genericAjaxErrorHandler);
    }).error(genericAjaxErrorHandler);

    scope.updatePolicies.view = function(policyId) {
        scope.updatePolicies.policyId = policyId;
        http.get('/policy/detail?policyId=' + policyId).success(function(response) {
            scope.updatePolicies.policy = response.result;
            scope.updatePolicies.policyName = response.result.name
            scope.updatePolicies.permissionsArray = getPermissionArray(response.result.policy);
            $("#updatePolicyDetailsModal").modal();
        }).error(genericAjaxErrorHandler);
    }
    scope.updatePolicies.addPermission = function(policyMasterName, policyMasterPermissionTypesName) {
        var token = policyMasterName + "|" + policyMasterPermissionTypesName;
        var indexInArray = scope.updatePolicies.permissionsArray.indexOf(token);
        if (indexInArray >= 0) {
            scope.updatePolicies.permissionsArray.splice(indexInArray, 1)
        } else {
            scope.updatePolicies.permissionsArray.push(token)
        }
    }
    scope.updatePolicies.checkPermission = function(policyMasterName, policyMasterPermissionTypesName) {
        var token = policyMasterName + "|" + policyMasterPermissionTypesName;
        if (scope.updatePolicies.permissionsArray !== undefined) {
            if (scope.updatePolicies.permissionsArray.indexOf(token) >= 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    function getPermissionArray(policy) {
        var permissionsArray = [];
        var outerKeys = _.keys(policy);
        outerKeys.forEach(function(outerKey) {
            var innerKeys = _.keys(policy[outerKey]);
            innerKeys.forEach(function(innerKey) {
                if (policy[outerKey][innerKey] === "Y") {
                    permissionsArray.push(outerKey + "|" + innerKey);
                }
            })
        });
        return permissionsArray;
    }
    scope.updatePolicies.updatePolicy = function() {
        var policyDetails = {
            "policyDetails": {
                policyId: scope.updatePolicies.policyId,
                policyMaster: scope.updatePolicies.policyMaster,
                policyMasterPermissionTypes: scope.updatePolicies.policyMasterPermissionTypes,
                policyName: scope.updatePolicies.policyName,
                permissionsArray: scope.updatePolicies.permissionsArray
            }
        }
        http.put('/ajax/policy', policyDetails).success(function() {
            $("#updatePolicyDetailsModal").modal('hide');
            dataSavedToDatabase("Policy updated");
        }).error(genericAjaxErrorHandler);
    }
}
