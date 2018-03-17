ecommerceApp.controller('deleteMerchantController', deleteMerchantController);
deleteMerchantController.$inject = ['$scope', '$http', '$state', 'permissions'];
function deleteMerchantController(scope, http, state, permissions) {
    scope.deleteMerchants = {};
    permissions.checkPermissionOnThisPage("isDelete", "Merchants");
    scope.deleteMerchants.load = function() {
        http.get('/ajax/users/merchants').success(function(response) {
            scope.deleteMerchants.users = response.result;
        }).error(genericAjaxErrorHandler);
    }
    scope.deleteMerchants.load();
    scope.deleteMerchants.delete = function(merchantId) {
        if (confirm("Are you sure, you want to delete this merchant?")) {
            http.delete('/ajax/users/merchants/' + merchantId).success(function(response) {
                showSuccessMessage(response.msg);
                scope.deleteMerchants.load();
            }).error(function(response){
               showErrorMessage(response.msg)
            })
        }
    }
}
