app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', '$rootScope', function ($scope, angularFire, $rootScope) {
  'use strict';

  // Companies
  var companiesRef = new Firebase($rootScope.fireBaseUrl + "/companies"),
      currentUserCompany    = $rootScope.currentUser.company;

  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

  $scope.notEqualTo = function(company1) {
    console.log(company1);
    return (company1 !== currentUserCompany);
  }

  $scope.currentUserCompany = currentUserCompany;

}]);