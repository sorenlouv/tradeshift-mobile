angular.module('usernameFilter', []).filter('username', function($timeout, $rootScope) {
  'use strict';

  var usersRef = new Firebase($rootScope.fireBaseUrl + "/users/");
  var users = null;
  usersRef.on('value', function(usersSnapshot){
    $timeout(function() {
      console.log("Loaded names 1!");
      users = usersSnapshot.val();
    }, 0);
  });

  function realFilter(input){
    var user = users[input];
    return user.name;
  }

  return function(input) {

    if(users === null){
      usersRef.on('value', function(usersSnapshot){
        $timeout(function() {
          console.log("Loaded names 2!");
          users = usersSnapshot.val();
        }, 0);
      });
      return "Loading name...";
    }else{
      return realFilter(input);
    }
  };
});