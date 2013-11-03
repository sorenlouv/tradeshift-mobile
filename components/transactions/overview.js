app.controller('OverviewController', ['$scope', 'angularFire', function ($scope, angularFire) {
  'use strict';

  var companyRef = new Firebase("https://tradeshift-mobile.firebaseio.com/companies").child();

  $scope.company = {};
  angularFire(companyRef, $scope, 'company');

}]);