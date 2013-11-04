app.controller('ActivityController', ['$scope', '$routeParams', 'angularFire', '$rootScope', function ($scope, $routeParams, angularFire, $rootScope) {

  'use strict';

  var createActivityHandle = function(company1, company2) {
    return (company1 < company2 ? company1 + "-" + company2 : company2 + "-" + company1);
  };

  var company_id      = $routeParams.company_id,
      my_company_id   = $rootScope.currentUser.company,
      handle          = createActivityHandle($rootScope.currentUser.company, company_id),

      // Get Firebase data
      company         = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/" + company_id),
      my_company      = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/" + my_company_id),
      activity      = new Firebase("https://tradeshift-mobile.firebaseio.com/activities/" + handle);





  // Prepare scope variables
  $scope.company = {};
  $scope.activities = {};
  $scope.product = null;
  $scope.product_price = {};

  // Bind firebase to scope
  angularFire(company, $scope, 'company');
  angularFire(activity, $scope, 'activity');

  // Sune's stuff
  $scope.addItem = function() {
    $('.picker').show();
  };

  $scope.hidePicker = function() {
    $('.picker').hide();
    $('.product-picker').hide();
    $('.select-picker').hide();
  };

  $scope.addProduct = function() {
    $('.product-picker').show();
  };

  $scope.selectProduct = function() {
    $('.select-picker').show();
  };

  $scope.save = function() {
    alert('saved!');
  };

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