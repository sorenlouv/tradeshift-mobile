app.controller('LoginController', ['$scope', '$rootScope', 'angularFire', '$routeParams', '$location', '$q', function ($scope, $rootScope, angularFire, $routeParams, $location, $q) {
  'use strict';

  // Users collection
  var usersRef = new Firebase("https://tradeshift-mobile.firebaseio.com/users");

  // Fetch the logged in user from DB. If he doesn't exist, create him
  var getOrCreateCurrentUser = function(facebookUser){
    var deferred = $q.defer();

    var currentUserRef = usersRef.child(facebookUser.id);
    currentUserRef.once('value', function(currentUserSnapshot){
      // Create user if not exists, or fetch from DB
      $scope.currentUser = (currentUserSnapshot.val() === null) ? {
        name: facebookUser.name,
        email: facebookUser.email
      } : currentUserSnapshot.val();

      // create 2-way binding between FireBase and angular models
      angularFire(currentUserRef, $scope, "currentUser");
      deferred.resolve($scope.currentUser);

      $scope.$apply();
    });

    return deferred.promise;
  };

  //
  var onAuthenticationChange = function(error, facebookUser) {
    if(error){
      console.log("Authentication error", error);

    }else if(facebookUser){
      // user signed in with Facebook
      var userInforReady = getOrCreateCurrentUser(facebookUser);
      $rootScope.loggedIn = true;

      // make sure all required info is filled out
      userInforReady.then(function(user){
        if(validateUserInfo(user)){
          $location.path($routeParams.redirect);
        }
      });

    }else{
      // user signed out
    }
  };

  // the user must fill in email, name and company
  var validateUserInfo = function(user){
    return (user.email && user.name && user.company);
  };

  // get login status
  var auth = new FirebaseSimpleLogin(usersRef, onAuthenticationChange);


  /************* Click events ************/

  $scope.updateUserInfo = function(){
    if(validateUserInfo($scope.currentUser)){
      $location.path($routeParams.redirect);
    }
  };

  // login with facebook
  $scope.login = function(){
    auth.login('facebook', {
      rememberMe: true,
      scope: 'email,user_likes'
    });
  };
}]);