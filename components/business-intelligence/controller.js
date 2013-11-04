app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', '$rootScope', function ($scope, angularFire, $rootScope) {
  'use strict';

  // Companies
  var companiesRef = new Firebase($rootScope.fireBaseUrl + "/companies"),
      currentUserCompany    = $rootScope.currentUser.company;

  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

  $scope.currentUserCompany = currentUserCompany;

  $scope.addCompany = function() {
    console.log("hmm");
  };


  $scope.chartData = {
    labels : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets : [
      {
        fillColor : "rgba(151,187,205,0)",
        strokeColor : "#e67e22",
        pointColor : "rgba(151,187,205,0)",
        pointStrokeColor : "#e67e22",
        data : [4, 3, 5, 4, 6]
      },
      {
        fillColor : "rgba(151,187,205,0)",
        strokeColor : "#f1c40f",
        pointColor : "rgba(151,187,205,0)",
        pointStrokeColor : "#f1c40f",
        data : [8, 3, 2, 5, 4]
      }
    ],
  };
  $scope.chartOptions = {
    pointDot : false,
    scaleLineColor : "rgba(0,0,0,1)",
  }


  var setupCanvas;
  setupCanvas = function(canvas) {
    var ctx, newWidth;
    canvas = $(canvas);
    newWidth = canvas.parent().width();
    canvas.prop({
      width: newWidth,
      height: 200
    });
    ctx = canvas.get(0).getContext("2d");
    return new Chart(ctx).Line($scope.chartData);
  };

  (function(canvas) {
    setupCanvas(canvas);
    return $(window).resize(function() {
      return setupCanvas(canvas);
    });
  })("#chart");

}]);