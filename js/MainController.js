/**
 * Created by ryan on 3/25/17.
 */

var swaggerDoc;


$.getJSON( "testDocs/swagger.json", function( data ) {
   console.log("data is: ", data);
   swaggerDoc = data;

   // just test building a list of all the path names
   var pathList = [];
   for (var key in swaggerDoc.paths) {
      pathList.push(key);
   }
   console.log("paths: ", pathList);

   // go through the tags and for each tag build a list of the paths that has the tag.
   var tagsList = [];
   swaggerDoc.tags.forEach( function(tag){
      tagsList.push(tag.name);
   });
   console.log("tags: ", tagsList);

});

var app = angular.module("myApp", []);


app.controller('MainController', ['$scope', function($scope) {
    $scope.swagger = swaggerDoc;
}]);