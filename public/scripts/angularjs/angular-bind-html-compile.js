(function () {
    'use strict';
    var module = angular.module('angular-bind-html-compile', []);
    module.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
    }]);
}());
/*angular.module('ngBindHtmlExample', ['ngSanitize'])

.controller('ngBindHtmlCtrl', ['$scope','$sce', function ngBindHtmlCtrl($scope, $sce) {
  $scope.myHTML =$sce.trustAsHtml(
     'I am an <code>HTML</code>string with <a href="#" ng-mouseover="removeExp()">links!</a> and other <em>stuff</em>');
  
    $scope.removeExp = function (){
       console.log('dfdfgdfgdfg');
    }
}])
.directive('compileTemplate', function($compile, $parse){
    return {
        link: function(scope, element, attr){
            var parsed = $parse(attr.ngBindHtml);
            function getStringValue() { return (parsed(scope) || '').toString(); }
            
            //Recompile if the template changes
            scope.$watch(getStringValue, function() {
                $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
            });
        }         
    }
});
    */