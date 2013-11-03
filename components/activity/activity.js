app.controller('ActivityController', ['$scope', '$routeParams', 'angularFire', function ($scope, $routeParams, angularFire) {
  
  'use strict';

  var createActivityHandle = function(company1, company2) {
    return (company1 < company2 ? ""+company1+"-"+company2 : company2+"-"+company1);
  }

  var company_id = $routeParams.company_id,
      handle     = createActivityHandle('adams æbler', 'hennings honning');

  activity = new Firebase("https://tradeshift-mobile.firebaseio.com/transactions/" + handle);

}]);