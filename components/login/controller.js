app.controller('LoginController', ['$scope', '$rootScope', 'angularFire', '$routeParams', '$location', '$q', 'safeApply', function ($scope, $rootScope, angularFire, $routeParams, $location, $q, safeApply) {
  'use strict';

  // Users collection
  var usersRef = new Firebase($rootScope.fireBaseUrl + "/users");
  var companiesRef = new Firebase($rootScope.fireBaseUrl + "/companies");

  /************* Helper methods ************/

  // Fetch the logged in user from DB. If he doesn't exist, create him
  var getOrCreateCurrentUser = function(facebookUser){
    var deferred = $q.defer();

    usersRef.child(facebookUser.id).once('value', function(activeUserSnapshot){

      // Create user if not exists, or fetch from DB
      var activeUser = (activeUserSnapshot.val() === null) ? {
        id: facebookUser.id,
        name: facebookUser.name,
        first_name: facebookUser.first_name,
        last_name: facebookUser.last_name,
        email: facebookUser.email
      } : activeUserSnapshot.val();

      // resolve promise
      safeApply($scope, function(){
        deferred.resolve(activeUser);
      });
    });

    return deferred.promise;
  };

  // get company data for the authenticated user (activeUser)
  var getOrCreateCurrentCompany = function(companyName){
    var deferred = $q.defer();

    var companyId = getValidIdentifier(companyName);
    companiesRef.child(companyId).once('value', function(companySnapshot){

      // Create user if not exists, or fetch from DB
      var activeCompany = (companySnapshot.val() === null) ? {
        name: companyName
      } : companySnapshot.val();

      // resolve promise
      safeApply($scope, function(){
        deferred.resolve(activeCompany);
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
      getOrCreateCurrentUser(facebookUser).then(function(activeUser){

        // create 2-way binding between FireBase and angular models
        $rootScope.activeUser = activeUser;
        angularFire(usersRef.child(facebookUser.id), $rootScope, "activeUser");
      });

    }else{
      // user signed out
    }
  };

  // watch for changes to activeUser and redirect if it passes validations
  $scope.$watch('activeUser', function(activeUser){
    // redirect to original page if user has filled out everything correctly
    if(validateUserInfo(activeUser)){
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
    if($scope.activeCompany && $scope.activeCompany.name){

      // strip illegal characters in company name
      var companyName = $scope.activeCompany.name;
      var companyId = getValidIdentifier($scope.activeCompany.name);

      // create 2-way binding between FireBase and angular models
      angularFire(companiesRef.child(companyId), $scope, "activeCompany").then(function(){
        getOrCreateCurrentCompany(companyName).then(function(activeCompany){
          $scope.activeCompany = activeCompany;

          // update users company
          $rootScope.activeUser.company = companyId;
        });
      });
    }
  };

  // login with facebook
  var auth = new FirebaseSimpleLogin(usersRef, onAuthenticationChange);
  $scope.facebookLogin = function(){
    auth.login('facebook', {
      rememberMe: true,
      scope: 'email,user_likes'
    });
  };

}]);