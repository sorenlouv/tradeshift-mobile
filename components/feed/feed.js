app.controller('FeedController',
  ['$scope', '$routeParams', 'angularFire', '$rootScope', 'helpers', 'documentService', function ($scope, $routeParams, angularFire, $rootScope, helpers, documentService) {

  'use strict';

  var passiveCompanyId = $routeParams.company_id,
      activeCompanyId = $rootScope.activeUser.company,
      feedId = helpers.getFeedId($rootScope.activeUser.company, passiveCompanyId),

      // Get Firebase data
      activeCompanyRef = new Firebase($rootScope.fireBaseUrl + "/companies/" + activeCompanyId),
      passiveCompanyRef = new Firebase($rootScope.fireBaseUrl + "/companies/" + passiveCompanyId),
      productsRef = new Firebase($rootScope.fireBaseUrl + "/companies/" + activeCompanyId + "/products"),
      feedRef = new Firebase($rootScope.fireBaseUrl + "/feeds/" + feedId),
      usersRef = new Firebase($rootScope.fireBaseUrl + "/users/");

  // Prepare scope variables
  $scope.passiveCompany = {};
  $scope.feed = {};
  $scope.products = {};
  $scope.users = {};
  $scope.selectedPrice = 0;
  $scope.activeUser = $rootScope.activeUser;
  $scope.selectLinesForInvoiceMode = false;
  $scope.selectedLineIds = [];
  var clickedLineId = null;

  $scope.dayfilter = [
    {
      name: 'Today',
      min: 0,
      max: 1
    },
    {
      name: 'Yesterday',
      min: 1,
      max: 2
    },
    {
      name: 'Older',
      min: 2,
      max: null
    }
  ];

  // Bind firebase to scope
  angularFire(activeCompanyRef, $scope, 'activeCompany');
  angularFire(passiveCompanyRef, $scope, 'passiveCompany');
  var feedPromise = angularFire(feedRef, $scope, 'feed');
  angularFire(productsRef, $scope, 'products');
  angularFire(usersRef, $scope, 'users');

  // Sune's stuff
  $scope.addItem = function() {
    $('.pickers').show();
  };

  $scope.hidePickers = function() {
    $('.quote-picker').hide();
    $('.product-picker').hide();
    $('.select-picker').hide();
    $('.newProduct-picker').hide();
    $('.lineActions-picker').hide();
    $('.edit-picker').hide();
    $('.pickers').hide();

    $scope.newLine = null;
  };

  $scope.addProduct = function() {
    $('.product-picker').show();
  };

  $scope.addQuote = function() {
    $('.quote-picker').show();
  };

  $scope.showAddNewProduct = function() {
    $('.newProduct-picker').show();
  };

  var lineIsValidForSelection = function(line){
    return (line.user === $rootScope.activeUser.id && line.type == "product");
  };

  // select all lines that belong to the active user and are of type product (not "quote"!)
  var getActiveUserLineIds = function(){
    var activeUserLineIds = [];
    _.each($scope.feed.lines, function(line, lineId){
      if(lineIsValidForSelection(line)){
        activeUserLineIds.push(lineId);
      }
    });
    return activeUserLineIds;
  };

  $scope.clickSelectLinesForInvoice = function() {
    $scope.selectLinesForInvoiceMode = true;
    $scope.selectedLineIds = getActiveUserLineIds();
    $scope.hidePickers();
  };

  $scope.getSelectedLinesTotal = function(){
    var total = 0;
    _.each($scope.selectedLineIds, function(lineId){
      var line = $scope.feed.lines[lineId];
      total += (line.product.quantity * line.product.custom_price);
    });
    return total;
  };

  $scope.getTotal = function(){
    var total = 0;
    var lines = $scope.feed.lines;
    _.each(lines, function(line){
      total += (line.product.quantity * line.product.custom_price);
    });
    return total;
  };

  // generate invoice from selected lines
  $scope.generateInvoice = function(){

    var invoice = feedRef.child('invoices').push();

    _.each($scope.selectedLineIds, function(lineId){
      var line = $scope.feed.lines[lineId];
      invoice.push(line, function removeLine(error){
        feedRef.child('lines').child(lineId).remove(function(){
          documentService.getUuid({
            invoice: $scope.feed.invoices[invoice.name()],
            senderCompany: $scope.activeCompany,
            receiverCompany: $scope.passiveCompany
          }).success(function(response){
          });
        });
        $scope.selectLinesForInvoiceMode = false;
        $scope.selectedLineIds = [];
      });
    });
  };


  /*********** New Line ***************/
  $scope.setProduct = function(product, type) {
    var date = new Date().toUTCString();
    $scope.newLine = {
      user: $rootScope.activeUser.id,
      description: '',
      product: angular.copy(product),
      type: type,
      createdAt: date,
      updatedAt: date
    };

    $scope.newLine.product.custom_price = $scope.newLine.product.price;
    $scope.newLine.product.quantity = 1;
    $('.select-picker').show();
  };

  $scope.setCustomPrice = function(price, e) {
    if (typeof $scope.newLine !== 'undefined' && $scope.newLine !== null) {
      $scope.newLine.product.custom_price = price;
    } else {
      $scope.clickedLine.product.custom_price = price;
    }
  };

  $scope.setQuantity = function(val) {
    if (typeof $scope.newLine !== 'undefined' && $scope.newLine !== null) {
      $scope.newLine.product.quantity = val;
    } else {
      $scope.clickedLine.product.quantity = val;
    }
  };

  $scope.addLine = function() {
    // Save the feed
    feedRef.child('lines').push($scope.newLine);
    $scope.hidePickers();
  };


  $scope.clickLine = function(lineId) {
    var line = $scope.feed.lines[lineId];

    // click line to select/de-select for invoice
    if($scope.selectLinesForInvoiceMode){

      if(!lineIsValidForSelection(line)){
        console.log("You can only select your own lines");
        return;
      }

      var selectedIndex = $scope.selectedLineIds.indexOf(lineId);
      // the line was already selected - de-select it!
      if(selectedIndex > -1){
        $scope.selectedLineIds.splice(selectedIndex, 1);
      // select the line
      }else{
        $scope.selectedLineIds.push(lineId);
      }

    // click line to edit/add comment
    } else {
      clickedLineId = lineId;
      $scope.clickedLine = angular.copy(line);
      $('.pickers').show();
      $('.lineActions-picker').show();
    }
  };

  $scope.addNewProduct = function() {
    productsRef.push({
      title: $('.newProduct input[name="title"]').val(),
      price: $('.newProduct input[name="price"]').val(),
      currency: $('.newProduct input[name="currency"]').val(),
      tax: $('.newProduct input[name="tax"]').val()
    });

    $('.newProduct input').val('');
    $('.newProduct-picker').hide();
  };

  $scope.showEdit = function() {
    $('.edit-picker').show();
  };

  $scope.acceptQuote = function(){
    feedRef.child('lines').child(clickedLineId).update({type: 'product'});
    addLineComment(clickedLineId, "accepted the quote", "update");
    $scope.hidePickers();
  };

  $scope.postComment = function() {
    var comment = $('.comment-form textarea').val();
    addLineComment(clickedLineId, comment, "comment");

    $('.pickers').hide();
  };

  var addLineComment = function(lineId, comment, type){
    feedRef.child('lines').child(lineId).child('comments').push({
      comment: comment,
      type: type,
      user: $rootScope.activeUser.id
    });
  };

  $scope.updateProduct = function() {
    var date = new Date().toUTCString();

    // update timestamp
    feedRef.child('lines').child(clickedLineId).update({
      updatedAt: date
    });

    feedRef.child('lines').child(clickedLineId).child('product').update({
      custom_price: $scope.clickedLine.product.custom_price,
      quantity: $scope.clickedLine.product.quantity
    });

    addLineComment(clickedLineId, "updated the product", "update");

    var comment = $scope.clickedLine.comment;
    if(typeof comment !== 'undefined' && comment !== '') {
      addLineComment(clickedLineId, comment, "comment");
    }

    $scope.hidePickers();
  };

  $scope.delete = function() {
    feedRef.child('lines').child(clickedLineId).remove();
    $scope.hidePickers();
    return false;
  };

  // Today: getLinesFromDaysAgo(0, 1)
  // Yesterday: getLinesFromDaysAgo(1, 2)
  // Older: getLinesFromDaysAgo(2)

  $scope.getLinesFromDaysAgo = function(minDays, maxDays) {

    $scope.feed.lines.filter(function(index, line) {
      var date = new Date();
      return (
        line.updatedAt < (date.setDate(date.getDate() - minDays)) &&
        line.updatedAt > (date.setDate(date.getDate() - maxDays))
      );
    });

  };

}]);
