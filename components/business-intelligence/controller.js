app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', '$rootScope', 'documentService', function ($scope, angularFire, $rootScope, documentService) {
  'use strict';

  // Companies
  var companiesRef = new Firebase($rootScope.fireBaseUrl + "/companies"),
      currentUserCompany    = $rootScope.currentUser.company;

  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

  $scope.currentUserCompany = currentUserCompany;

  $scope.addCompany = function() {
    console.log("hmm");
  };
}]);