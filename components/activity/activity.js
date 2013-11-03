app.controller('ActivityController', ['$scope', '$routeParams', 'angularFire', function ($scope, $routeParams, angularFire) {
  
  'use strict';

  var createActivityHandle = function(company1, company2) {
    return (company1 < company2 ? ""+company1+"-"+company2 : company2+"-"+company1);
  }

  var company_id = $routeParams.company_id,
      handle     = createActivityHandle('adams æbler', 'hennings honning');

  activity = new Firebase("https://tradeshift-mobile.firebaseio.com/transactions/" + handle);





  // Sune's stuff
  $scope.addItem = function() {
  	$('.picker').show();
  }

  $scope.hidePicker = function() {
  	$('.picker').hide();
  	$('.product-picker').hide()
  	$('.select-picker').hide();
  }
  $scope.addProduct = function() {
  	$('.product-picker').show();
  }
  $scope.selectProduct = function() {
  	$('.select-picker').show();
  }

}]);





// app.controller('TransactionController', ['$scope', 'angularFire', '$routeParams', function ($scope, angularFire, $routeParams) {
//   'use strict';

//   var company_id      = $routeParams.company_id,
//       transaction_id  = $routeParams.transaction_id,
//       transaction     = new Firebase("https://tradeshift-mobile.firebaseio.com/transactions/" + transaction_id);
  
//   $scope.transaction = {};
//   angularFire(transaction, $scope, 'transaction');

//   $scope.transaction_id = transaction_id;

// }]);