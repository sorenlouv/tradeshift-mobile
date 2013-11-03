var app = angular.module("tradeshift-mobile", ["firebase", "ngRoute"]);

// router
app.config(function ($routeProvider) {
  'use strict';
  $routeProvider.
    when('/business-intelligence', {templateUrl: '/components/business-intelligence/template.html', controller: 'BusinessIntelligenceController'}).
    when('/contacts', {templateUrl: '/components/contacts/template.html', controller: 'ContactsController'}).

    // Settings
    when('/settings', {templateUrl: '/components/settings/template.html', controller: 'SettingsController'}).

    // Transactions
    when('/transactions', {templateUrl: '/components/transactions/overview.html', controller: 'OverviewController'}).
    when('/transactions/:company_id', {templateUrl: '/components/transactions/companyTransactions.html', controller: 'CompanyTransactionsController'}).
    when('/transactions/:company_id/:transaction_id', {templateUrl: '/components/transactions/transaction.html', controller: 'TransactionController'}).

    // Login
    when('/login/:redirect', {templateUrl: '/components/login/template.html', controller: 'LoginController'}).
    otherwise({redirectTo: '/business-intelligence'});
});

// login routing
app.run( function($rootScope, $location) {
  'use strict';

  // register listener to watch route changes
  $rootScope.$on( "$locationChangeStart", function(event, next, current) {
    // user is not logged in, and should be redirected to login page
    if ( $rootScope.loggedIn !== true && next.match('/#/login') === null) {
      console.log("Redirecting to login page");
      var redirect = next.slice((next.indexOf('/#/') + 3));
      $location.path( "/login/" + redirect );
    }
  });
});