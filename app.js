var app = angular.module("tradeshift-mobile", ["firebase", "ngRoute"]);

// router
app.config(function ($routeProvider) {
  'use strict';
  $routeProvider.
    when('/business-intelligence', {templateUrl: '/components/business-intelligence/template.html', controller: 'BusinessIntelligenceController'}).
    when('/contacts', {templateUrl: '/components/contacts/template.html', controller: 'ContactsController'}).
    when('/transactions', {templateUrl: '/components/transactions/template.html', controller: 'TransactionsController'}).
    otherwise({redirectTo: '/business-intelligence'});
});
