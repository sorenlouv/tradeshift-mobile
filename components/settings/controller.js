app.controller('SettingsController', ['$scope','$rootScope' , 'angularFire', function ($scope, $rootScope, angularFire) {
  'use strict';

  var companyRef = new Firebase($rootScope.fireBaseUrl + "/companies").child($rootScope.activeUser.company);
  $scope.company = {};
  angularFire(companyRef, $scope, "company");
}]);