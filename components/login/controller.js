app.controller('LoginController', ['$scope', '$rootScope', 'angularFire', '$routeParams', '$location', function ($scope, $rootScope, angularFire, $routeParams, $location) {
  'use strict';

  // Users collection
  var usersRef = new Firebase("https://tradeshift-mobile.firebaseio.com/users");

  // Fetch the logged in user from DB. If he doesn't exist, create him
  var getOrCreateCurrentUser = function(facebookUser){
    var currentUserRef = usersRef.child(facebookUser.id);
    currentUserRef.once('value', function(currentUserSnapshot){
      // Create user if not exists, or fetch from DB
      $scope.currentUser = (currentUserSnapshot.val() === null) ? {
        name: facebookUser.name,
        email: facebookUser.email
      } : currentUserSnapshot.val();

      // create 2-way binding between FireBase and angular models
      angularFire(currentUserRef, $scope, "currentUser");
    });
  };

  //
  var onAuthenticationChange = function(error, facebookUser) {
    if(error){
      console.log("Authentication error", error);

    }else if(facebookUser){
      // user signed in with Facebook
      getOrCreateCurrentUser(facebookUser);
      $rootScope.loggedIn = true;
      $location.path($routeParams.redirect);

    }else{
      // user signed out
    }
  };

  // get login status
  var auth = new FirebaseSimpleLogin(usersRef, onAuthenticationChange);


  /************* Click events ************/

  // login with facebook
  $scope.login = function(){
    auth.login('facebook', {
      rememberMe: true,
      scope: 'email,user_likes'
    });
  };
}]);