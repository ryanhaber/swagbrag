/**
 * Created by ryan on 3/25/17.
 */

var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', function($scope) {
    $scope.stuff = "Hello World!!!";
}]);