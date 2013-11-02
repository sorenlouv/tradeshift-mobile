app.controller('BusinessIntelligenceController', ['$scope', function ($scope, angularFire) {
  'use strict';

  var database = new Firebase("https://ir2qox768r2.firebaseio-demo.com/");
  $scope.messages = [];
  angularFire(database, $scope, "messages");

  $scope.sendMessage = function(){
    $scope.messages.push({
      from: $scope.name,
      body: $scope.msg
    });
  };
}]);