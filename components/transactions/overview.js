app.controller('OverviewController', ['$scope', 'angularFire', 'angularFireCollection', function ($scope, angularFire, angularFireCollection) {
  'use strict';

  var companiesRef = new Firebase("https://tradeshift-mobile.firebaseio.com/companies");
  
  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

}]);