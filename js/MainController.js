/**
 * Created by ryan on 3/25/17.
 */

var swaggerDoc;
var pathList = [];
var tagsList = [];
var pathsByTag = [];

function tagInList(tag, tagslist) {
   var retval = tagslist.indexOf(tag);
   return ( retval );
}


$.getJSON("testDocs/zd24swagger.json", function (data) {
   console.log("data is: ", data);
   swaggerDoc = data;

   // go through the tags and for each tag build a list of the paths that has the tag.
   swaggerDoc.tags.forEach(function (tag) {
      tagsList.push(tag.name);

      var tagPath = {'tag': tag.name};
      var pathList = [];

      for (var path in swaggerDoc['paths']) {
         for (var method in swaggerDoc['paths'][path]) {

            if (tagInList(tag.name, swaggerDoc['paths'][path][method]['tags']) > -1) {
               var pathInfo = swaggerDoc['paths'][path][method];
               pathInfo.path = path;
               pathInfo.method = method;
               pathList.push(pathInfo);
            }
         }
      }
      tagPath.pathList = pathList;
      pathsByTag.push(tagPath);
   });
});

function getPathListByTag(tagName, pathList) {
   var retPath;
   var i = 0;

   pathList.forEach(function (path) {
      if (path.tag == tagName) {
         retPath = pathList[i];
      }
      i++;
   });

   return(retPath);
}


var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', function ($scope) {
   $scope.swagger = swaggerDoc;
}]);