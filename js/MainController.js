/**
 * Created by ryan on 3/25/17.
 */

var swaggerDoc;

function inTag(swagDoc, tagName, pathName) {
   if (tagName in swagDoc[pathName].tags) {
      return true;
   } else {
      return false;
   }
}

$.getJSON( "testDocs/swagger.json", function( data ) {
   console.log("data is: ", data);
   swaggerDoc = data;
   var swagPaths = [];
   for (var key in swaggerDoc.paths) {
      swagPaths.push(key);
   }
   console.log("paths: ", swagPaths);

   // go through the tags and for each tag build a list of the paths that has the tag.

});

var app = angular.module("myApp", []);


app.controller('MainController', ['$scope', function($scope) {
    $scope.swagger = swaggerDoc;
}]);