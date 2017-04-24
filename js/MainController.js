/**
 * Created by ryan on 3/25/17.
 */

var swaggerDoc;
var pathList = [];
var tagsList = [];
var pathsByTag = {};

$.getJSON( "testDocs/zd24swagger.json", function( data ) {
   console.log("data is: ", data);
   swaggerDoc = data;

   // just test building a list of all the path names

   for (var key in swaggerDoc.paths) {
      pathList.push(key);
   }
   console.log("paths: ", pathList);

   // go through the tags and for each tag build a list of the paths that has the tag.

   swaggerDoc.tags.forEach( function(tag){
      tagsList.push(tag.name);
   });
   // console.log("tags: ", tagsList);



   // fixme: Map the swagger docs from native format to a list of tags, each tag having
   // fixme: all the path-method-info objects that have that tag

   tagsList.forEach( function(tagToCatalog) {
      // console.log( "cataloging ", tagToCatalog);
      var matchingPaths = [];
      var methodsList = [];

      for (var path in swaggerDoc['paths']) {
         for (var method in swaggerDoc['paths'][path]) {
            console.log("path[method]['tags']: ", swaggerDoc['paths'][path][method]['tags']);

            var test = swaggerDoc['paths'][path][method]['tags'].indexOf(tagToCatalog);
            if (test > -1) {
               methodsList.push(method);
            }
         }
      }

      if (methodsList != []) {
         pathsByTag[tagToCatalog] = {'path':path, 'methodLists':methodsList, 'info':swaggerDoc['paths'][path][method]};
      }
//      pathsByTag[tagToCatalog] = matchingPaths;
   });

   console.log("pathsByTag", pathsByTag);
});



var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', function($scope) {
    $scope.swagger = swaggerDoc;
}]);