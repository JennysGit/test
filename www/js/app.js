// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .directive('pttVoiceLine', function() {
    return {
      restrict: 'E',
      template: `<canvas class="voice-container" id="voiceLine{{attrId}}"></canvas>`,
      replace: 'true',
      scope: {
        attrId: '=',
        duration: '='
      },
      link: function(scope, eles, attrs) {

        eles.ready(function() {
          let minWidth = 50;
          let maxWidth = 150;
          if (scope.duration > 2) {
            let width = minWidth + ((scope.duration - 2) * 10);
            width = width > maxWidth ? maxWidth : width;
            eles.css('width', width + 'px');
          }
          makeVoiceLine();

          let $pttButton = eles.parent().parent('button.ptt-message');
          let pttWidth = $pttButton[0].clientWidth;
          //pttWidth = scope.duration > 2 ? pttWidth + 15 : pttWidth; // 为padding预留15px
          let pttHeight = $pttButton[0].clientHeight;
          $pttButton.css('width', pttWidth + 'px').css('height', pttHeight + 'px');

        });

        function makeVoiceLine() {

          let canvasId = 'voiceLine' + scope.attrId;
          var canvas = document.getElementById(canvasId);
          var context = canvas.getContext("2d");

          canvas.width = eles[0].clientWidth * 3;
          canvas.height = eles[0].clientHeight * 3;

          context.lineWidth = 2;
          context.strokeStyle = "white";
          let interval = 8;

          for (var i = 1; i <= canvas.width / interval; i++) {
            var rdm = Math.floor(Math.random() * 50);

            context.moveTo(interval * i, rdm);

            context.lineTo(interval * i, canvas.height - rdm);

            context.stroke();
          }
        }
      }
    }
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });
