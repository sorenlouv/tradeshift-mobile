angular.module('usernameFilter', []).filter('username', function($timeout, $rootScope) {
  'use strict';

  var usersRef = new Firebase($rootScope.fireBaseUrl + "/users/");
  var users = null;
  usersRef.on('value', function(usersSnapshot){
    $timeout(function() {
      users = usersSnapshot.val();
    }, 0);
  });

  function realFilter(input, full){
    var user = users[input];
    if(user === undefined) return;
    if(full){
      return user.name;
    }else{
      return user.first_name;
    }

  }

  return function(input, full) {

    if(users === null){
      usersRef.on('value', function(usersSnapshot){
        $timeout(function() {
          users = usersSnapshot.val();
        }, 0);
      });
      return "Loading name...";
    }else{
      return realFilter(input, full);
    }
  };
});