app.controller('SettingsController', ['$scope','$rootScope' , 'angularFire', function ($scope, $rootScope, angularFire) {
  'use strict';

  var companyRef = new Firebase("https://tradeshift-mobile.firebaseio.com/companies").child($rootScope.currentUser.company);
  $scope.company = {};
  angularFire(companyRef, $scope, "company");
}]);