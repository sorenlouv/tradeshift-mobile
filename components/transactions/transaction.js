app.controller('TransactionController', ['$scope', 'angularFire', '$routeParams', function ($scope, angularFire, $routeParams) {
  'use strict';

  var company_id      = $routeParams.company_id,
      transaction_id  = $routeParams.transaction_id,
      transaction     = new Firebase("https://tradeshift-mobile.firebaseio.com/transactions/" + transaction_id);
  
  $scope.transaction = {};
  angularFire(transaction, $scope, 'transaction');

  $scope.transaction_id = transaction_id;

}]);