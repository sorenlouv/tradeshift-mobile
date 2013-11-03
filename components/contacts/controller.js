app.controller('ContactsController', ['$scope', 'angularFire', 'angularFireCollection', function ($scope, angularFire, angularFireCollection) {
  'use strict';

  // users
  var usersRef = new Firebase("https://tradeshift-mobile.firebaseio.com/users");
  $scope.users = null;
  angularFire(usersRef, $scope, "users");

}]);