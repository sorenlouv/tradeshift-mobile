app.controller('ActivityController', ['$scope', '$routeParams', 'angularFire', function ($scope, $routeParams, angularFire) {
  
  'use strict';

  createActivityHandle = function(company1, company2) {
    
  }

  var company_id = $routeParams.company_id,
      handle     = createActivityHandle(company_id, currentUserCompany);

  activity = new Firebase("https://tradeshift-mobile.firebaseio.com/transactions/" + handle);

}]);