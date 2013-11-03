app.controller('ContactsController', ['$scope', 'angularFire', 'angularFireCollection', function ($scope, angularFire, angularFireCollection) {
  'use strict';

  // Main app
  var appRef = new Firebase("https://tradeshift-mobile.firebaseio.com");

  // users
  var usersRef = appRef.child('users');
  $scope.users = null;
  angularFire(usersRef, $scope, "users");

  var getOrCreateCurrentUser = function(facebookUser){
    var currentUserRef = usersRef.child(facebookUser.id);
    currentUserRef.once('value', function(currentUserSnapshot){
      // Create user if not exists, or fetch from DB
      $scope.currentUser = (currentUserSnapshot.val() === null) ? {
        name: facebookUser.name,
        email: facebookUser.email
      } : currentUserSnapshot.val();

      // automagic updates
      angularFire(currentUserRef, $scope, "currentUser");
    });
  };

  //
  var onFacebookLogin = function(error, facebookUser) {
    if(error) console.log("Auth error", error);

    // user signed in with Facebook
    if(facebookUser){
      getOrCreateCurrentUser(facebookUser);
    }
  };

  // get login status
  var auth = new FirebaseSimpleLogin(usersRef, onFacebookLogin);


  /************* Click events ************/

  // login with facebook
  $scope.login = function(){
    auth.login('facebook', {
      rememberMe: true,
      scope: 'email,user_likes'
    });
  };
}]);