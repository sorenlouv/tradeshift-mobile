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

  // Feeds
  var feedsRef = new Firebase($rootScope.fireBaseUrl + "/feeds");
  var feedsPromise = angularFire(feedsRef, $scope, 'feeds');

  // get totalts for each company
  $q.all([companiesPromise, feedsPromise]).then(function(){

    $scope.totalUnsettled = 0;
    $scope.totaltUnsettledByCompany = {};
    _.each($scope.companies, function(company, companyId){

      var feedId = helpers.getFeedId(companyId, $rootScope.activeUser.company);
      var feed = $scope.feeds[feedId];

      var total = 0;
      if(feed !== undefined){
        var lines = feed.lines;
        _.each(lines, function(line){
          total += (line.product.quantity * line.product.custom_price);
        });
      }
      $scope.totaltUnsettledByCompany[companyId] = total;
      $scope.totalUnsettled += total;
    });
  });

}]);