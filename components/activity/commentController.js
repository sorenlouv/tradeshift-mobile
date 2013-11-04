app.controller('CommentController', ['$scope', '$routeParams', 'angularFire', '$rootScope', function ($scope, $routeParams, angularFire, $rootScope) {

  'use strict';

  var activityRef = new Firebase("https://tradeshift-mobile.firebaseio.com/activities/");
  $scope.activities = {};
  angularFire(activityRef, $scope, 'activities');

  $scope.postComment = function(lineId, activityId) {

    var comment = $('.comment-form textarea').val();

    activityRef.child(activityId).child('lines').child(lineId).child('comments').push({
      comment: comment,
      user: angular.copy($rootScope.currentUser)
    });

    $('.picker').hide();
  }

}]);