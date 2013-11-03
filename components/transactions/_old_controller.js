app.controller('TransactionsControllerOld', ['$scope', 'angularFire', 'angularFireCollection', function ($scope, angularFire, angularFireCollection) {
  'use strict';

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