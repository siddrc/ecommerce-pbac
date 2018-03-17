ecommerceApp.controller('notPermittedController', notPermittedController);
notPermittedController.$inject = ['$scope', '$http', '$state'];

function notPermittedController(scope, http, state) {
    scope.notPermitted = {};
}
