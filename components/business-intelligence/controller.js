app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', '$rootScope', function ($scope, angularFire, $rootScope) {
  'use strict';

  // Companies
  var companiesRef = new Firebase($rootScope.fireBaseUrl + "/companies"),
      currentUserCompany    = $rootScope.currentUser.company;

  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

  $scope.currentUserCompany = currentUserCompany;
}]);