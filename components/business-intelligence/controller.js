app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', '$rootScope', function ($scope, angularFire, $rootScope) {
  'use strict';

  // Companies
  var companiesRef = new Firebase($rootScope.fireBaseUrl + "/companies"),
      activeUserCompany    = $rootScope.activeUser.company;

  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

  $scope.activeUserCompany = activeUserCompany;


}]);