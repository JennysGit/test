angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, $interval, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
    $scope.messageList = [{
      id: 1,
      duration: 2,
      volume: '...',
    }];
    var timer = null;
    $scope.isSendingPttMessage = false;
    $scope.sendPttMessage = function() {
      $scope.isSendingPttMessage = !$scope.isSendingPttMessage;
      if ($scope.isSendingPttMessage) {
        var len = $scope.messageList.length;
        var user = {
          id: $scope.messageList[len - 1] + 1,
          duration: null,
          volume: '.',
          isRecording: true
        }
        $scope.messageList.push(user);

        // timer = $interval(function() {
        //   if (user.volume == '...') {
        //     user.volume = '';
        //   }
        //   user.volume += '.';
        // }, 500);
      } else {
        var len = $scope.messageList.length;
        $scope.messageList[len - 1].isRecording = false;
      }
    };
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
