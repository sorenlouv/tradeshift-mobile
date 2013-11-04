app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', '$rootScope', function ($scope, angularFire, $rootScope) {
  'use strict';

  // Companies
  var companiesRef = new Firebase("https://tradeshift-mobile.firebaseio.com/companies"),
      currentUserCompany    = $rootScope.currentUser.company;

  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

  $scope.currentUserCompany = currentUserCompany;
}]);


// app.filter('notEqualTo', function($rootScope) {
//   'use strict';

//   var currentUserCompany = $rootScope.currentUser.company;

//   return function(company) {
//     return (currentUserCompany === company) ? false : company;
//   };
// }