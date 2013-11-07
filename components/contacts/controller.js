app.controller('ContactsController', ['$scope', 'angularFire', 'angularFireCollection', '$rootScope', function ($scope, angularFire, angularFireCollection, $rootScope) {
  'use strict';

  // users
  var usersRef = new Firebase($rootScope.fireBaseUrl + "/users");
  $scope.users = null;
  angularFire(usersRef, $scope, "users");

}]);