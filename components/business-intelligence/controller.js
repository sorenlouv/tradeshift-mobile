app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', '$rootScope', function ($scope, angularFire, $rootScope) {
  'use strict';

  // Companies
  var companiesRef = new Firebase($rootScope.fireBaseUrl + "/companies"),
      activeUserCompany    = $rootScope.activeUser.company;

  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

  $scope.activeUserCompany = activeUserCompany;

  $scope.editSettings = function() {
    $('.pickers').show();
    $('.settings-picker').show();
  };

  $scope.hidePickers = function() {
    $('.product-picker').hide();
    $('.select-picker').hide();
    $('.newProduct-picker').hide();
    $('.lineActions-picker').hide();
    $('.edit-picker').hide();
    $('.pickers').hide();

    $scope.newActivity = null;
  };

}]);