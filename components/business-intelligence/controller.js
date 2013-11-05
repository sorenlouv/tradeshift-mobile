app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', '$rootScope', 'helpers', '$q', function ($scope, angularFire, $rootScope, helpers, $q) {
  'use strict';


  // Companies

  $scope.editSettings = function() {
    $('.pickers').show();
    $('.settings-picker').show();
  };

  $scope.hidePickers = function() {
    $('.product-picker').hide();
    $('.select-picker').hide();
    $('.newProduct-picker').hide();
    $('.lineActions-picker').hide();
    $('.edit-picker').hide();
    $('.pickers').hide();

    $scope.newActivity = null;
  };

  var companiesRef = new Firebase($rootScope.fireBaseUrl + "/companies");
  var companiesPromise = angularFire(companiesRef, $scope, 'companies');

  var usersRef = new Firebase($rootScope.fireBaseUrl + "/users");
  var usersPromise = angularFire(usersRef, $scope, 'users');

  // Feeds
  var feedsRef = new Firebase($rootScope.fireBaseUrl + "/feeds");
  var feedsPromise = angularFire(feedsRef, $scope, 'feeds');

  // get totalts for each company
  $q.all([companiesPromise, feedsPromise]).then(function(){

    var feedList = [];

    $scope.totalUnsettled = 0;
    $scope.totaltUnsettledByCompany = {};
    _.each($scope.companies, function(company, companyId){

      var feedId = helpers.getFeedId(companyId, $rootScope.activeUser.company);
      var feed = $scope.feeds[feedId];
      var total = 0;
      if(feed !== undefined){
        var invoice = feed['invoices'];
        if (invoice !== undefined) {
          feedList.push(feedId);
        }
        var lines = feed.lines;
        _.each(lines, function(line){
          total += (line.product.quantity * line.product.custom_price);
        });
      }
      $scope.totaltUnsettledByCompany[companyId] = total;
      $scope.totalUnsettled += total;
    });

    _.each(feedList, function(feedId) {

      var invoicesRef = new Firebase($rootScope.fireBaseUrl + '/feeds/' + feedId + '/invoices'),
          activeCompanyId = $rootScope.activeUser.company;

      angularFire(invoicesRef, $scope, 'invoices').then(function() {
        var invoices = {};

        _.each($scope.invoices, function(invoice, index) {

          var first, company_id;
          for (first in invoice) break;
          invoices[index] = {};
          usersPromise.then(function() {
            company_id = $scope.users[invoice[first].user].company;
            invoices[index].company_id = $scope.companies[company_id].name;
            invoices[index].date = '';
            invoices[index].direction = ($rootScope.activeUser.company === company_id) ? 'left' : 'right';

            var price = 0;
            _.each($scope.invoices[index], function(sinvoice) {
              price += sinvoice.product.custom_price * sinvoice.product.quantity
            });
            invoices[index].price = price;

            $scope.parsedInvoices = invoices;
          });
        });
      });
    });
    // console.log(feedList);


    // // Invoices
    //



  });

}]);