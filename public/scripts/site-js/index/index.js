var serverIpAddress = "192.168.1.4"; //"localhost" // ip-address given by router
angular.module("applicationConstants", []).constant('serviceHost', 'http://' + serverIpAddress + ':3000');

var ecommerceApp = angular.module("ecommerceApp", ['ui.router', 'http-auth-interceptor',
    'ngStorage', 'applicationConstants','akoenig.deckgrid'
]);
ecommerceApp.directive('file', function() {
    return {
        scope: {
            file: '='
        },
        link: function(scope, el, attrs) {
            el.bind('change', function(event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
});
$(document).ready(function() {
    $('[data-submenu]').submenupicker();
});
