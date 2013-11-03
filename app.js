var app = angular.module("tradeshift-mobile", ["firebase", "ngRoute"]);

// router
app.config(function ($routeProvider) {
  'use strict';
  $routeProvider.
    when('/business-intelligence', {templateUrl: '/components/business-intelligence/template.html', controller: 'BusinessIntelligenceController'}).
    when('/contacts', {templateUrl: '/components/contacts/template.html', controller: 'ContactsController'}).
    when('/transactions', {templateUrl: '/components/transactions/template.html', controller: 'TransactionsController'}).
    when('/login', {templateUrl: '/components/login/template.html', controller: 'LoginController'}).
    otherwise({redirectTo: '/business-intelligence'});
});

// login routing
app.run( function($rootScope, $location) {
  'use strict';

  // register listener to watch route changes
  $rootScope.$on( "$locationChangeStart", function(event, next, current) {
    // user is not logged in, and should be redirected to login page
    if ( !$rootScope.loggedUser && next.match('/#/login$') === null) {
      $location.path( "/login" );
    }
  });
});