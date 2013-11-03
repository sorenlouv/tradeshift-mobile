app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', function ($scope, angularFire) {
  'use strict';

  // Companies
  var companiesRef = new Firebase("https://tradeshift-mobile.firebaseio.com/companies");

  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

}]);