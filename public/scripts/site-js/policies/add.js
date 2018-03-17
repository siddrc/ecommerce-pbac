ecommerceApp.controller('addPoliciesController', addPoliciesController);
addPoliciesController.$inject = ['$scope', '$http', '$state', 'permissions','serviceHost'];

function addPoliciesController(scope, http, state, permissions,serviceHost) {
    scope.addPolicy = {};
    permissions.checkPermissionOnThisPage("isWrite", "Policies");
    scope.addPolicy.permissionsArray = [];
    http.get("/ajax/policyMaster").success(function(response) {
        scope.addPolicy.policyMaster = response.result;
        http.get("/ajax/policyMasterPermissionTypes").success(function(response) {
            scope.addPolicy.policyMasterPermissionTypes = response.result;
        }).error(genericAjaxErrorHandler);
    }).error(genericAjaxErrorHandler);

    scope.addPolicy.addPermission = function(policyMasterName, policyMasterPermissionTypesName) {
        var token = policyMasterName + "|" + policyMasterPermissionTypesName;
        var indexInArray = scope.addPolicy.permissionsArray.indexOf(token);
        if (indexInArray >= 0) {
            scope.addPolicy.permissionsArray.splice(indexInArray, 1)
        } else {
            scope.addPolicy.permissionsArray.push(token)
        }
    }
    scope.addPolicy.checkPermission = function(policyMasterName, policyMasterPermissionTypesName) {
        var token = policyMasterName + "|" + policyMasterPermissionTypesName;
        if (scope.addPolicy.permissionsArray.indexOf(token) >= 0) {
            return true;
        } else {
            return false;
        }

    }
    scope.addPolicy.createPolicy = function() {
        var policyDetails = {
            "policyDetails": {
            	policyMaster : scope.addPolicy.policyMaster,
            	policyMasterPermissionTypes : scope.addPolicy.policyMasterPermissionTypes,
                policyName: scope.addPolicy.policyName,
                permissionsArray: scope.addPolicy.permissionsArray
            }
        }
        http.post('/ajax/policy', policyDetails).success(function() {
        	scope.addPolicy.policyName = "";
        	scope.addPolicy.permissionsArray = [];
            dataSavedToDatabase("Policy created");
        }).error(genericAjaxErrorHandler);
    }
}
