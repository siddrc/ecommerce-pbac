ecommerceApp.service('permissions', permissions);
permissions.$inject = ['$http', '$state'];

function permissions(http, state) {
    this.checkPermissionOnThisPage = function(typeOfAction, entity) {
        http.get('/policy/check?typeOfAction=' + typeOfAction + '&entity=' + entity).success(function(checkPolicyResponse) {
            if (checkPolicyResponse === 'N') {
                showErrorMessage("Not permitted, as per policy.");
                state.go("notPermitted");
            }
        }).error(genericAjaxErrorHandler);

    }
}
