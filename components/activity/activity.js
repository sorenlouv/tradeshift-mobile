app.controller('ActivityController', ['$scope', '$routeParams', 'angularFire', '$rootScope', function ($scope, $routeParams, angularFire, $rootScope) {
  
  'use strict';

  var createActivityHandle = function(company1, company2) {
    return (company1 < company2 ? ""+company1+"-"+company2 : company2+"-"+company1);
  };

  var company_id      = $routeParams.company_id,
      my_company_id   = $rootScope.currentUser.company,
      handle          = createActivityHandle($rootScope.currentUser.company, company_id),

      // Get Firebase data
      company         = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/" + company_id),
      my_company      = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/" + my_company_id),
      activities      = new Firebase("https://tradeshift-mobile.firebaseio.com/transactions/" + handle);

  // Prepare scope variables
  $scope.company = {};
  $scope.activities = {};

  // Bind firebase to scope
  angularFire(company, $scope, 'company');
  angularFire(activities, $scope, 'activities');
  
  console.log($scope.company);























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

  $scope.generaInvoice = function() {
    console.log("cik");
    $('.picker').hide();
    $('.product-picker').hide();
    $('.select-picker').hide();
    $('.creator').html("<input type='checkbox' checked value='test'>");
    $('.transactions').prepend("<div class='generate'><p>5 items worth 120.000 excl tax (150.000 incl) selected</p><a class='button' >Generate invoice <i class='fa fa-cogs'></i></a></div");
  };

  $scope.generate = function() {
    console.log("test");
    $('.generate').hide();
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