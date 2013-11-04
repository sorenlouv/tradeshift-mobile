app.controller('ActivityController', ['$scope', '$routeParams', 'angularFire', '$rootScope', function ($scope, $routeParams, angularFire, $rootScope) {

  'use strict';

  var getActivityId = function(company1, company2) {
    return (company1 < company2 ? company1 + "-" + company2 : company2 + "-" + company1);
  };

  var companyId      = $routeParams.company_id,
      currentUserCompany   = $rootScope.currentUser.company,
      activityId          = getActivityId($rootScope.currentUser.company, companyId),

      // Get Firebase data
      companyRef         = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/" + companyId),
      currentUserCompanyRef  = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/" + currentUserCompany),
      productsRef        = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/" + currentUserCompany + "/products"),
      activityRef        = new Firebase("https://tradeshift-mobile.firebaseio.com/activities/" + activityId);

  // Prepare scope variables
  $scope.company = {};
  $scope.activity = {};
  $scope.products = {};
  $scope.new_activity = {};

  // Bind firebase to scope
  angularFire(companyRef, $scope, 'company');
  angularFire(activityRef, $scope, 'activity');
  angularFire(productsRef, $scope, 'products');

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

  $scope.selectProduct = function(product) {
    $scope.new_activity.product = product;
    $('.select-picker').show();
  };

  $scope.selectPrice = function(price) {
    $scope.new_activity.product.custom_price = price;
  };

  $scope.generaInvoice = function() {
    $('.picker').hide();
    $('.product-picker').hide();
    $('.select-picker').hide();
    $('.creator').html("<input type='checkbox' checked value='test'>");
    $('.transactions').prepend("<div class='generate'><p>5 items worth 120.000 excl tax (150.000 incl) selected</p><a class='button' >Generate invoice <i class='fa fa-cogs'></i></a></div");
  };

  $scope.generate = function() {
    $('.generate').hide();
  };

  $scope.save = function() {
    $scope.activities.push($scope.new_activity);
  };

}]);
