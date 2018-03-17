ecommerceApp.controller('addProductImageController', addProductImageController);
addProductImageController.$inject = ['$scope', '$http', '$state', 'permissions','$stateParams'];

function addProductImageController(scope, http, state, permissions,stateParams) {
    permissions.checkPermissionOnThisPage("isWrite", "Products");
    scope.uploadProductImage = {};
    console.log("stateParams.targetProductId "+stateParams.targetProductId)
    scope.uploadProductImage.productId = stateParams.targetProductId;
}
