var app = angular.module("tradeshift-mobile", ["firebase", "ngRoute", "safeApply", "usernameFilter", "backendMod"]);

// router
app.config(function ($routeProvider) {
  'use strict';
  $routeProvider.
    when('/business-intelligence', {templateUrl: '/components/business-intelligence/template.html', controller: 'BusinessIntelligenceController'}).
    when('/contacts', {templateUrl: '/components/contacts/template.html', controller: 'ContactsController'}).

    // Settings
    when('/settings', {templateUrl: '/components/settings/template.html', controller: 'SettingsController'}).

    // Activity
    when('/activity/:company_id', {templateUrl: '/components/activity/activity.html', controller: 'ActivityController'}).

    // Products
    when('/products', {templateUrl: '/components/products/template.html', controller: 'ProductController'}).

    // Login
    when('/login/:redirect', {templateUrl: '/components/login/template.html', controller: 'LoginController'}).
    otherwise({redirectTo: '/business-intelligence'});
});

// login routing
app.run( function($rootScope, $location) {
  'use strict';

  $rootScope.fireBaseUrl = "https://tradeshift-mobile.firebaseio.com/";

  // register listener to watch route changes
  $rootScope.$on( "$locationChangeStart", function(event, next, current) {
    // user is not logged in, and should be redirected to login page
    if ( $rootScope.loggedIn !== true && next.match('/#/login') === null) {
      console.log("Redirecting to login page");
      var redirect = next.slice((next.indexOf('/#/') + 3));
      $location.path( "/login/" + encodeURIComponent( redirect ) );
    }
  });
});