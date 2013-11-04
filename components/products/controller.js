app.controller('ProductController', ['$scope','$rootScope' , 'angularFire', function ($scope, $rootScope, angularFire) {
  'use strict';

  var products = new Firebase("https://tradeshift-mobile.firebaseio.com/companies")
                  .child($rootScope.currentUser.company)
                  .child('products');
  
  $scope.products = {};
  angularFire(products, $scope, "products");

  $scope.new_product = function() {
    $scope.products.push({
      title: $('.new_product input[name="title"]').val(),
      price: $('.new_product input[name="price"]').val(),
      unit: $('.new_product input[name="unit"]').val(),
      currency: $('.new_product input[name="currency"]').val()
    });

    $('.new_product input').val('');
  }
}]);