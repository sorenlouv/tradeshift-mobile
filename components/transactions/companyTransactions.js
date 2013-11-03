app.controller('CompanyTransactionsController', ['$scope', 'angularFire', '$routeParams', function ($scope, angularFire, $routeParams) {

  'use strict';

  var company_id = $routeParams.company_id,
      companiesRef = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/" + company_id + "/transactions");

  $scope.company_id = company_id;

  $scope.transactions = {};
  angularFire(companiesRef, $scope, 'transactions');

}]);