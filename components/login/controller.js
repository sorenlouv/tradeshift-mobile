app.controller('LoginController', ['$scope', '$rootScope', 'angularFire', '$routeParams', '$location', '$q', 'safeApply', function ($scope, $rootScope, angularFire, $routeParams, $location, $q, safeApply) {
  'use strict';

  // Users collection
  var usersRef = new Firebase("https://tradeshift-mobile.firebaseio.com/users");

  /************* Helper methods ************/

  // Fetch the logged in user from DB. If he doesn't exist, create him
  var getOrCreateCurrentUser = function(facebookUser){
    var deferred = $q.defer();

    usersRef.child(facebookUser.id).once('value', function(authenticatedUserSnapshot){

      // Create user if not exists, or fetch from DB
      var currentUser = (authenticatedUserSnapshot.val() === null) ? {
        name: facebookUser.name,
        email: facebookUser.email
      } : authenticatedUserSnapshot.val();

      // resolve promise
      safeApply($scope, function(){
        deferred.resolve(currentUser);
      });
    });

    return deferred.promise;
  };

  // get company data for the authenticated user (currentUser)
  var getOrCreateCurrentCompany = function(companyName){
    var deferred = $q.defer();

    var companyId = getValidIdentifier($scope.currentCompany.name);
    var currentCompanyRef = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/").child(companyId);
    currentCompanyRef.once('value', function(companySnapshot){

      // Create user if not exists, or fetch from DB
      var currentCompany = (companySnapshot.val() === null) ? {
        name: companyName
      } : companySnapshot.val();

      // resolve promise
      safeApply($scope, function(){
        deferred.resolve(currentCompany);
      });
    });

    return deferred.promise;
  };

  //
  var onAuthenticationChange = function(error, facebookUser) {
    if(error){
      console.log("Authentication error", error);

    }else if(facebookUser){
      // user signed in with Facebook
      getOrCreateCurrentUser(facebookUser).then(function(currentUser){

        // create 2-way binding between FireBase and angular models
        $rootScope.currentUser = currentUser;
        angularFire(usersRef.child(facebookUser.id), $rootScope, "currentUser");
      });

    }else{
      // user signed out
    }
  };

  // watch for changes to currentUser and redirect if it passes validations
  $scope.$watch('currentUser', function(currentUser){
    // redirect to original page if user has filled out everything correctly
    if(validateUserInfo(currentUser)){
      $rootScope.loggedIn = true;
      var redirect = decodeURIComponent($routeParams.redirect);
      console.log("Logged in and redirecting to", redirect);
      $location.path(redirect);
    }
  });

  var getValidIdentifier = function(string){
    if(string === undefined) return "";
    return string.replace(/\W/g, '').toLowerCase();
  };

  // the user must fill in email, name and company
  var validateUserInfo = function(user){
    return (user && user.email && user.name && user.company);
  };

  /************* Click events ************/

  $scope.updateUserInfo = function(){
    if($scope.currentCompany && $scope.currentCompany.name){

      // strip illegal characters in company name
      var companyName = $scope.currentCompany.name;
      var companyId = getValidIdentifier($scope.currentCompany.name);

      getOrCreateCurrentCompany(companyName).then(function(currentCompany){
        var currentCompanyRef = new Firebase("https://tradeshift-mobile.firebaseio.com/companies/").child(companyId);

        // create 2-way binding between FireBase and angular models
        $scope.currentCompany = currentCompany;
        angularFire(currentCompanyRef, $scope, "currentCompany");

        // update users company
        $rootScope.currentUser.company = companyId;
      });
    }
  };

  // login with facebook
  var auth = new FirebaseSimpleLogin(usersRef, onAuthenticationChange);
  $scope.login = function(){
    auth.login('facebook', {
      rememberMe: true,
      scope: 'email,user_likes'
    });
  };

}]);